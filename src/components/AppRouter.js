import {observer} from "mobx-react-lite";
import {authRoutes, publicRoutes} from "../routes";
import {Switch, Route, Redirect} from "react-router-dom"
import {INDEX_ROUTE} from "../utils/constants";
import {useContext} from "react";
import {Context} from "../index";

const AppRouter = observer(() => {
    const {userStore} = useContext(Context)
    return (
        <Switch>
            {userStore.isAuth && authRoutes.map(({path, Component}) => {
                return (<Route key={path} path={path} component={Component} exact/>);
            })}
            {publicRoutes.map(({path, Component}) => {
                return (<Route key={path} path={path} component={Component} exact/>);
            })}
            <Redirect to={INDEX_ROUTE}/>
        </Switch>
    );
});

export default AppRouter;