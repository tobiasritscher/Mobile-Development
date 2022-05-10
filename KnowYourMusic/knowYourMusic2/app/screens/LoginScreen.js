import React, {useContext, useState} from "react";
import * as Yup from "yup";
import jwtDecode from "jwt-decode";

import Screen from "../components/Screen";
import {ErrorMessage, AppForm, AppFormField, SubmitButton} from '../components/forms';
import authApi from "../api/auth";
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";
import {Button} from 'react-native-elements';
import Navigation from "../components/Navigation";


const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen({navigation}) {
    const authContext = useContext(AuthContext);
    const [loginFailed, setLoginFailed] = useState(false);


    const handleSubmit = async ({email, password}) => {
        const result = await authApi.login(email, password);
        if (!result.ok) return setLoginFailed(true);
        setLoginFailed(false);
        const user = jwtDecode(result.data);
        authContext.setUser(user);
        console.log(user)
        authStorage.storeToken(result.data)
    }


    return (
        <Screen>
            <ErrorMessage error="Invalid email and/or password." visible={loginFailed}/>
            <AppForm
                initialValues={{email: "", password: ""}}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <AppFormField
                    name="email"
                    placeholder="E-Mail"
                    icon="email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                />
                <AppFormField
                    name="password"
                    placeholder="Password"
                    icon="lock"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType="password"
                />
                <SubmitButton title="Login"/>
            </AppForm>
            <Button
                title="Reset Password"
                type="clear"
                onPress={() => navigation.navigate("ResetPassword")}
            />
        </Screen>
    );
}

export default LoginScreen;
