import React, {useState, useEffect, useContext} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext);

    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();

    const [form, setForm] = useState({
        email: '', password: ''
    })
    const changeHandler = e => {
        setForm({...form,  [e.target.name]: e.target.value})
    }

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    })

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form}, {})
            message(data.message);
        } catch (e) {
        }
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form}, {})
            auth.login(data.token, data.userId);
        } catch (e) {
        }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>URL shortener</h1>
                <div className="card blue darken-3">
                    <div className="card-content white-text">
                        <span className="card-title">Sign in</span>
                        <div>

                            <div className="input-field">
                                <input
                                    placeholder="Please enter an email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    className="yellow-input"
                                    autoComplete="off"
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="Please enter a password"
                                    id="password"
                                    type="text"
                                    name="password"
                                    className="yellow-input"
                                    autoComplete="off"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Password</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            style={{marginRight: 15}}
                            disabled={loading}
                            onClick={loginHandler}>Sign in</button>
                        <button
                            className="btn grey lighten-1 black-text"
                            onClick={registerHandler}
                            disabled={loading}>Sign up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}