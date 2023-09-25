const request=require('supertest');
const app=require('../app');
const { generarJWT } = require('../Utils/JWT');



describe("Tests para BalanceApi",()=>{
 
    it("Deberia agregar dinero a una cuenta",async()=>{

        const token=await generarJWT(1,'Alice Johnson','buyer');

        const idCuenta=1;

        const result=await request(app).post(`/api/balance/deposit/${idCuenta}`)
        .send({monto:15})
        .set('Cookie',`token=${token}`);

        expect(result.statusCode).toBe(200);

        expect(result.body).toEqual({
            ok:true,
            message:'Monto agregado correctamente'
        })

    })

    it("Deberia dar error por validacion de usuario",async()=>{

        const token=await generarJWT(1,'Alice Johnson','buyer');

        const idCuenta=2;

        const result=await request(app).post(`/api/balance/deposit/${idCuenta}`)
        .send({monto:15})
        .set('Cookie',`token=${token}`);

        expect(result.statusCode).toBe(401);

        expect(result.body).toEqual({
            ok:false,
            message:'Error de validacion de usuario'
        });

    })

    it("Deberia error por tope deposito",async()=>{

        const token=await generarJWT(1,'Alice Johnson','buyer');

        const idCuenta=1;

        const result=await request(app).post(`/api/balance/deposit/${idCuenta}`)
        .send({monto:2000})
        .set('Cookie',`token=${token}`);

        expect(result.statusCode).toBe(400);

        expect(result.body).toEqual({
            ok:false,
            message:'El monto a depositar supera el tope del 10%'
        })

    })

})