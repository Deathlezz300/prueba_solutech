const request=require('supertest');
const app=require('../app');
const { generarJWT } = require('../Utils/JWT');



describe("Test para SubmissionsAPI",()=>{
 
    it("Deberia traer la lista de las submissions sin pagar",async()=>{

        const token=await generarJWT(1,'Alice Johnson','buyer');

        const result=await request(app).get(`/api/submissions/unpaid`)
        .set('Cookie',`token=${token}`);

        expect(result.statusCode).toBe(200);

        expect(result.body).toEqual({
            ok:true,
            submissions:expect.any(Array)
        });

        expect(result.body.submissions.every((sub)=>sub.paid===false)).toBe(true)

    })

    it("Deberia hacer el pago de la submission",async()=>{

        const token=await generarJWT(1,'Alice Johnson','buyer');

        const idSubmission=2;

        const result=await request(app).post(`/api/submissions/${idSubmission}/pay`)
        .set('Cookie',`token=${token}`);

        expect(result.statusCode).toBe(200);

        expect(result.body).toEqual({
            ok:true,
            message:'Orden pagada correctamente'
        })
         
    })

    it("Deberia negar el acceso a pagar esta submission",async()=>{

        const token=await generarJWT(1,'Alice Johnson','buyer');

        const idSubmission=3;

        const result=await request(app).post(`/api/submissions/${idSubmission}/pay`)
        .set('Cookie',`token=${token}`);

        expect(result.statusCode).toBe(400);

        expect(result.body).toEqual({
            ok:false,
            message:'No tiene acceso a esta submission'
        })

    })

})