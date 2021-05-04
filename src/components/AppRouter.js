import {observer} from "mobx-react-lite";
import {authRoutes, publicRoutes} from "../routes";
import {Redirect, Route, Switch} from "react-router-dom"
import {INDEX_ROUTE} from "../utils/constants";
import useStore from "../hooks/useStore";

const AppRouter = () => {
    const {userStore} = useStore()
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
};

export default observer(AppRouter);