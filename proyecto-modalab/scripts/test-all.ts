import { spawn, spawnSync, type ChildProcess } from "node:child_process";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { delimiter, dirname, isAbsolute, join, resolve } from "node:path";
import { createServer } from "node:net";
import { setTimeout as delay } from "node:timers/promises";

const projectRoot = process.cwd();
const adminPassword =
  process.env.MODALAB_ADMIN_PASSWORD ?? "Demo-Admin-2026!";
const sellerPassword =
  process.env.MODALAB_SELLER_PASSWORD ?? "Demo-Seller-2026!";

function findK6(): string {
  if (process.env.K6_PATH) {
    const configuredPath = resolve(process.env.K6_PATH);
    if (!existsSync(configuredPath)) {
      throw new Error(`No se encontró el ejecutable indicado por K6_PATH: ${configuredPath}`);
    }
    return configuredPath;
  }

  if (process.platform === "win32") {
    const wingetPath = join(
      process.env.ProgramFiles ?? "C:\\Program Files",
      "k6",
      "k6.exe",
    );
    if (existsSync(wingetPath)) return wingetPath;
    return "k6.exe";
  }

  return "k6";
}

function runNpm(args: string[], env: NodeJS.ProcessEnv): void {
  const npmExecPath = process.env.npm_execpath;
  const result = npmExecPath
    ? spawnSync(process.execPath, [npmExecPath, ...args], {
        cwd: projectRoot,
        env,
        stdio: "inherit",
      })
    : spawnSync(process.platform === "win32" ? "npm.cmd" : "npm", args, {
        cwd: projectRoot,
        env,
        shell: process.platform === "win32",
        stdio: "inherit",
      });

  if (result.error) {
    throw new Error(`No se pudo ejecutar npm ${args.join(" ")}: ${result.error.message}`);
  }
  if (result.status !== 0) {
    throw new Error(`npm ${args.join(" ")} terminó con código ${result.status ?? "desconocido"}.`);
  }
}

function verifyK6(executable: string): void {
  const result = spawnSync(executable, ["version"], {
    cwd: projectRoot,
    encoding: "utf8",
  });
  if (result.error) {
    throw new Error(
      `No se pudo ejecutar k6. Instálalo con "winget install k6 --source winget" ` +
        `o define K6_PATH. Detalle: ${result.error.message}`,
    );
  }
  if (result.status !== 0) {
    throw new Error(`k6 version terminó con código ${result.status ?? "desconocido"}.`);
  }
  process.stdout.write(result.stdout);
}

async function findFreePort(): Promise<number> {
  const server = createServer();
  await new Promise<void>((resolveListen, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolveListen);
  });

  const address = server.address();
  if (!address || typeof address === "string") {
    server.close();
    throw new Error("No se pudo determinar un puerto local disponible para A06.");
  }

  const { port } = address;
  await new Promise<void>((resolveClose, reject) => {
    server.close((error) => (error ? reject(error) : resolveClose()));
  });
  return port;
}

async function waitForServer(
  server: ChildProcess,
  url: string,
  getSpawnError: () => Error | undefined,
): Promise<void> {
  const deadline = Date.now() + 120_000;
  let lastFailure = "el servidor aún no responde";

  while (Date.now() < deadline) {
    const spawnError = getSpawnError();
    if (spawnError) {
      throw new Error(`No se pudo iniciar Next.js: ${spawnError.message}`);
    }
    if (server.exitCode !== null) {
      throw new Error(`El servidor Next.js terminó con código ${server.exitCode}.`);
    }

    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(3_000) });
      if (response.ok) return;
      lastFailure = `respondió HTTP ${response.status}`;
    } catch (error) {
      lastFailure = error instanceof Error ? error.message : String(error);
    }
    await delay(500);
  }

  throw new Error(`Next.js no respondió en 120 segundos; último estado: ${lastFailure}.`);
}

async function stopServer(server: ChildProcess): Promise<void> {
  if (server.exitCode !== null) return;

  const exited = new Promise<void>((resolveExit) => {
    server.once("exit", () => resolveExit());
  });
  server.kill();
  await Promise.race([exited, delay(5_000)]);
  if (server.exitCode === null) {
    server.kill("SIGKILL");
    await exited;
  }
}

async function main(): Promise<void> {
  const k6 = findK6();
  verifyK6(k6);

  const tempDirectory = mkdtempSync(join(tmpdir(), "modalab-test-all-"));
  const baseEnv: NodeJS.ProcessEnv = {
    ...process.env,
    APP_ENV: "demo",
    MODALAB_ADMIN_PASSWORD: adminPassword,
    MODALAB_SELLER_PASSWORD: sellerPassword,
  };
  const e2eEnv: NodeJS.ProcessEnv = {
    ...baseEnv,
    MODALAB_DB_PATH: join(tempDirectory, "e2e.sqlite"),
    PLAYWRIGHT_OUTPUT_DIR: join(tempDirectory, "playwright-results"),
  };

  try {
    console.log("\n== Lint ==");
    runNpm(["run", "lint"], baseEnv);

    console.log("\n== A01-A04: pruebas unitarias y de integración ==");
    runNpm(["test"], baseEnv);

    console.log("\n== A05: pruebas de navegador ==");
    runNpm(["run", "test:e2e"], e2eEnv);

    console.log("\n== Build de producción requerido por A06 ==");
    runNpm(["run", "build"], baseEnv);

    const port = await findFreePort();
    const loadEnv: NodeJS.ProcessEnv = {
      ...baseEnv,
      MODALAB_DB_PATH: join(tempDirectory, "load.sqlite"),
      LOGIN_URL: `http://127.0.0.1:${port}/api/auth/login`,
      LOGIN_EMAIL: "admin@modalab.test",
      LOGIN_PASSWORD: adminPassword,
      PATH: `${dirname(k6)}${delimiter}${baseEnv.PATH ?? ""}`,
    };

    console.log("\n== Preparar base temporal de A06 ==");
    runNpm(["run", "test:e2e:prepare"], loadEnv);

    console.log("\n== A06: carga local con k6 ==");
    const server = spawn(
      process.execPath,
      [
        join(projectRoot, "node_modules", "next", "dist", "bin", "next"),
        "start",
        "--hostname",
        "127.0.0.1",
        "--port",
        String(port),
      ],
      { cwd: projectRoot, env: loadEnv, stdio: "inherit" },
    );
    let spawnError: Error | undefined;
    server.once("error", (error) => {
      spawnError = error;
    });

    try {
      await waitForServer(server, `http://127.0.0.1:${port}/`, () => spawnError);
      runNpm(["run", "test:load"], loadEnv);
    } finally {
      await stopServer(server);
    }
  } finally {
    rmSync(tempDirectory, { recursive: true, force: true });
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
