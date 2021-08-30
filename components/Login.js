import React, { useEffect, useState } from "react";

const TARGET_DIGEST = "SU5GTy0wMDktMDAx";

const Login = ({ setAuth }) => {
    const [password, setPassword] = useState("");
    const [hasError, setError] = useState(false);

    const handleForm = (e) => {
        e.preventDefault();

        if (btoa(password) === TARGET_DIGEST) {
            setAuth(true);
            sessionStorage.setItem("password", password);
        } else {
            setError(true);
        }
    }

    useEffect(() => {
        const previous = sessionStorage.getItem("password");
        if (previous && btoa(previous) === TARGET_DIGEST) {
            setAuth(true);
        }
    }, []);

    return (
        <div className="hero is-info is-fullheight has-text-centered">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <p className="title">
                        Caso Práctico
                    </p>
                    <p className="subtitle">
                        Og Astorga
                    </p>
                    <form className="box has-text-left" style={{ width: "25vw", margin: "0 auto", minWidth: 200 }} onSubmit={handleForm}>
                        <div className="field">
                            <label className="label">Clave de acceso</label>
                            <div className="control">
                                <input
                                    type="text"
                                    className="input"
                                    value={password}
                                    onChange={e => {
                                        setPassword(e.target.value);
                                        setError(false);
                                    }}
                                />
                            </div>
                            {hasError ? (
                                <span className="help has-text-danger"><b>Error:</b> clave inválida</span>
                            ) : null}
                        </div>

                        <button className="button is-info is-fullwidth">Acceder al sitio</button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Login;