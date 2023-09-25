const request=require('supertest');
const app=require('../app');


describe('Accounts',()=>{
    it("Deberia logear a un usuario",async()=>{

        const result=await request(app).post('/api/auth')
        .send({fullName:'Alice'}).expect(200);

        expect(result.body).toEqual({
            ok: true,
            usuario: {
                id: 1,
                firstName: 'Alice',
                lastName: 'Johnson',
                profession: 'Engineer',
                balance: expect.any(Number),
                type: 'buyer',
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            },
            token: expect.any(String)
        });
    });

    it('Deberia crear una cuenta',async()=>{

        const usuarioCrear={
            nombre:'Prueba 1',
            apellido:'apellido 1',
            tipo:'buyer',
            profesion:'Developer'
        }

        const result=await request(app).post('/api/auth/register')
        .send(usuarioCrear).expect(200);

        expect(result.statusCode).toBe(200);
        expect(result.body).toEqual({
           ok:true,
           usuario:{
            id:expect.any(Number),
            firstName:usuarioCrear.nombre,
            lastName:usuarioCrear.apellido,
            type:usuarioCrear.tipo,
            profession:usuarioCrear.profesion,
            balance:0,
            createdAt:expect.any(String),
            updatedAt:expect.any(String)
           },
           token:expect.any(String)
        })

    })

    it('Deberia retornar esta cuenta no existe',async()=>{

        const result=await request(app).post('/api/auth')
        .send({fullName:'No existe'});

        expect(result.statusCode).toBe(400);
        expect(result.body).toEqual({
            ok:false,
            message:'Esta cuenta no existe'
        })

    });

    it('Deberia retornar esta cuenta ya existe al registrar',async()=>{

        const usuarioCrear={
            nombre:'Alice',
            apellido:'Johnson',
            tipo:'buyer',
            profesion:'Developer'
        }

        const result=await request(app).post('/api/auth/register').send(usuarioCrear);

        expect(result.statusCode).toBe(400);

        expect(result.body).toEqual({
            ok:false,
            message:'Este usuario ya existe'
        })

    });

});