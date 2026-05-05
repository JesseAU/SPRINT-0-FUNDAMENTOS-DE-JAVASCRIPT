import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "../src/app.module";
import { HttpExceptionFilter } from "../src/common/http-exception.filter";

describe("Restaurante NestJS — Tests de integración", () => {
  let app: INestApplication;
  let token: string;
  const email = `test_e2e_${Date.now()}@rest.com`;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Debe realizar el flujo completo: Register -> Login -> Validar Protegida", async () => {
    // 1. Register
    const regRes = await request(app.getHttpServer())
      .post("/auth/register")
      .send({ name: "Mesero Test", email, password: "password123" });
    expect(regRes.status).toBe(201);

    // 2. Login
    const loginRes = await request(app.getHttpServer())
      .post("/auth/login")
      .send({ email, password: "password123" });
    expect(loginRes.status).toBe(200);
    token = loginRes.body.access_token;
    expect(token).toBeDefined();

    // 3. Probar ruta protegida con token (Validación fallida pero autorizada)
    const pedRes = await request(app.getHttpServer())
      .post("/api/pedidos")
      .set("Authorization", `Bearer ${token}`)
      .send({ tipo: "invalido" });
    
    // Si llegamos aquí con 400, la autenticación funcionó y falló la validación (correcto)
    expect(pedRes.status).toBe(400);
    expect(pedRes.body.message).toContain("tipo debe ser 'mesa' o 'para_llevar'");
  });

  it("Debe rechazar accesos no autorizados", async () => {
    const res = await request(app.getHttpServer())
      .post("/api/pedidos")
      .send({ tipo: "para_llevar" });
    expect(res.status).toBe(401);
  });

  it("Debe validar campos extras (Whitelist)", async () => {
    const res = await request(app.getHttpServer())
      .post("/auth/register")
      .send({ name: "Hacker", email: "hacker@test.com", password: "password123", extra: "ataque" });
    expect(res.status).toBe(400);
    expect(res.body.message).toContain("property extra should not exist");
  });
});
