const {Router}=require('express');
const {check}=require('express-validator')
const AuthRouter=Router();
const {LoginUser,RenovarToken, RegisterUser}=require('../Controllers/AuthControllers')
const {validarCampos}=require('../middlewares/validarCampos')
const {validarJWT}=require('../middlewares/validar-JWT')

AuthRouter.post('/',[
    check('fullName','El nombres es obligatorio').not().isEmpty(),
    validarCampos
],LoginUser);

AuthRouter.get('/validate',validarJWT,RenovarToken)

AuthRouter.post('/register',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('apellido','El apellido es obligatorio').not().isEmpty(),
    check('profesion','La profesion es obligatoria').not().isEmpty(),
    check('tipo','El tipo es obligatorio').not().isEmpty(),
    validarCampos
],RegisterUser)

module.exports=AuthRouter