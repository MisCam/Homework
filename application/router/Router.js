const express = require("express");
const router = express.Router();

const baseRouter = require("./BaseRouter");

function Router({ mediator }) {
    router.get("/book/show/:id", showPhoneBookHandler);
    router.get("/users/registration/:login/:password", registrationHandler);
    router.get("/users/login/:login/:password", loginHandler);
    router.get("/book/add/:user_id/:number/:name", phoneBookAddHandler);
    router.get("/book/delete/:user_id/:number", phoneBookDeleteHandler);
    router.get("/*", getError);

    const BaseRouter = new baseRouter();

    function getError(request, response) {
        response.json(BaseRouter.error(9000));
    }

    function showPhoneBookHandler(request, response) {
        const { user_id } = request.params;
        response.json(mediator.TRIGGERS.SHOW_CONTACTS(user_id));
    }

    function phoneBookAddHandler(request, response) {
        const { number, name } = request.params;
        const result = phoneBook.add(number, name, id);
        if (result) {
            response.json(BaseRouter.answer(true));
        }
        response.json(BaseRouter.error(1001));
    }

    function phoneBookDeleteHandler(request, response) {
        const { number } = request.params
        for (let i = 0; i < book.length; i++) {
            if (book[i].number === number) {
                book.splice(i, 1);
                response.json(BaseRouter.answer("Пользователь был удалён"));
                return;
            }
        }
        response.json(BaseRouter.error(1002));
    }

    function registrationHandler(request, response) {
        const { login, password } = request.params;
        const result = userManager.registration(login, password);
        if (result) {
            phoneBook.createBook();
            response.json(BaseRouter.answer('Пользователь был зарегестрирован'));
            return;
        }
        response.json(BaseRouter.error(1001));
    }

    function loginHandler(request, response) {
        const { login, password } = request.params;
        const result = userManager.login(login, password);
        if (result) {
            mediator.call(mediator.events, )
            response.json(BaseRouter.answer(result));
            return;
        }
        response.json(BaseRouter.error(1003));
    }

    return router;
}

module.exports = Router;
