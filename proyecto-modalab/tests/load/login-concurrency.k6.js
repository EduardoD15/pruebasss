import http from "k6/http";
import { check } from "k6";

const loginUrl = __ENV.LOGIN_URL || "http://127.0.0.1:3000/api/auth/login";
if (!/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/api\/auth\/login$/.test(loginUrl)) {
  throw new Error("La prueba de carga solo está habilitada para localhost.");
}

export const options = {
  vus: 50,
  iterations: 50,
  thresholds: {
    http_req_duration: ["avg<2000"],
    checks: ["rate==1"],
    http_req_failed: ["rate<0.01"],
  },
};

function loginConcurrency() {
  const response = http.post(
    loginUrl,
    JSON.stringify({
      email: __ENV.LOGIN_EMAIL || "admin@modalab.test",
      password: __ENV.LOGIN_PASSWORD,
    }),
    { headers: { "Content-Type": "application/json" } },
  );

  check(response, {
    "login responds successfully": (result) => result.status === 200,
  });
}

export default loginConcurrency;
