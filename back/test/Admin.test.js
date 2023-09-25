const request=require('supertest');
const app=require('../app');
const { generarJWT } = require('../Utils/JWT');


describe("Test para AdminApi",()=>{

    it("Deberia traer la mejor profession de los supplier en un rango",async()=>{

        const token=await generarJWT(1,'Alice Johnson','buyer');

        const fechaMin="2022-04-20T14:30:06.000Z";

        const fechaMax="2022-05-03T12:00:07.000Z"

        const result=await request(app).get(`/api/admin/best-supplier-profession?start=${fechaMin}&end=${fechaMax}`)
        .set('Cookie',`token=${token}`);

        expect(result.statusCode).toBe(200);

        expect(result.body).toEqual({
            ok:true,
            professionWithSales:{
                profession:expect.any(String),
                totalSales:expect.any(Number)
            }
        })

    })

    
    it("Deberia traer los mejores compradores segun rango",async()=>{

        const token=await generarJWT(1,'Alice Johnson','buyer');

        const fechaMin="2022-04-20T14:30:06.000Z";

        const fechaMax="2022-05-03T12:00:07.000Z";

        const limit=2;

        const result=await request(app).get(`/api/admin/best-buyers?start=${fechaMin}&end=${fechaMax}&limit=${limit}`)
        .set('Cookie',`token=${token}`);

        expect(result.statusCode).toBe(200);

        expect(result.body).toEqual({
            ok:true,
            usersWithBuys:expect.any(Array)
        })

        expect(result.body.usersWithBuys.length).toBeLessThanOrEqual(limit)

    })

    it("Deberia traer las fechas min y maximas",async()=>{

        const token=await generarJWT(1,'Alice Johnson','buyer');

        const result=await request(app).get('/api/admin/fechas')
        .set('Cookie',`token=${token}`);

        expect(result.statusCode).toBe(200);

        expect(result.body).toEqual({
            ok:true,
            fechaMin:expect.any(String),
            fechaMax:expect.any(String)
        })

    })

})