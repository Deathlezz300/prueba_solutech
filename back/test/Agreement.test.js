const request=require('supertest');
const app=require('../app');
const { generarJWT } = require('../Utils/JWT');


describe("Pruebas para AgreementApi",()=>{


    it("Deberia traer la lista de Agreements para un usuario",async()=>{

        const token=await generarJWT(1,'Alice Johnson','buyer');

        const result =await request(app).get('/api/agreements/')
        .set('Cookie',`token=${token}`);

        expect(result.statusCode).toBe(200);

        expect(result.body).toEqual({
            ok:true,
            agreements:expect.any(Array)
        })

        expect(result.body.agreements.every((agree)=>agree.status==='in_progress')).toBe(true)

    })

    it('Deberia traer un Agreement en especifico',async()=>{

        const idAgreement=1;

        const token=await generarJWT(1,'Alice Johnson','buyer');

        const result=await request(app).get(`/api/agreements/${idAgreement}`)
        .set('Cookie',`token=${token}`);

        expect(result.statusCode).toBe(200);

        expect(result.body).toEqual({
            ok:true,
            aggreement:expect.any(Object)
        })

    });

    it("Deberia regresar error al intentar acceder a un Agreement sin acceso",async()=>{

        const idAgreement=6;

        const token=await generarJWT(1,'Alice Johnson','buyer');

        const result=await request(app).get(`/api/agreements/${idAgreement}`)
        .set('Cookie',`token=${token}`);

        expect(result.statusCode).toBe(401)

        expect(result.body).toEqual({
            ok:false,
            message:'No tiene acceso a este acuerdo'
        })

    })

})