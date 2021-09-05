import React, { useMemo, useState } from "react";

const AllPaths = ({ calcAllPaths }) => {
    return (
        <div className="field">
            <button onClick={calcAllPaths} className="button is-info is-fullwidth">
                Calcular
            </button>
        </div>
    );
};

const Cell = ({ cell, i, j, tick }) => {
    if (i == 0 || j == 0) {
        return <strong>{cell}</strong>
    }

    let [median, stddev] = cell.split("±");
    median = +median;
    stddev = +stddev;

    if (median > 100000) {
        return (
            <span>-</span>
        );
    }

    const value = useMemo(() => {
        const v1 = Math.random(), v2 = Math.random();
        const z1 = Math.sqrt(-2*Math.log(v1))*Math.cos(2*Math.PI*v2);

        return stddev * z1 + median;
    }, [median, stddev, tick]);

    return (
        <span title={"µ = " + median.toFixed(2) + "\nσ = " + stddev.toFixed(2)}>{value.toFixed(2)}</span>
    );
}

const useInterval = callback => {
    const savedCallback = React.useRef();
  
    React.useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
  
    React.useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        let id = setInterval(tick, 100);
        return () => clearInterval(id);
    }, []);
};

const AllPathsModal = ({ paths, setPaths }) => {
    let [tick, setTick] = useState(0);

    useInterval(() => setTick(tick + 1));

    if (paths === null) {
        return null;
    }

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={() => setPaths(null)}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Caminos más cortos entre vértices</p>
                    <button className="delete" aria-label="close" onClick={() => setPaths(null)}></button>
                </header>
                <section className="modal-card-body">
                    <div className="notification">
                        Cada celda representa el tiempo en segundos del camino más corto desde su fila respectiva hasta su respectiva columna.
                    </div>
                    <table className="table mt-1 has-text-right">
                        <tbody>
                            {paths.map((row, i) => (
                                <tr key={i}>
                                    {row.map((cell, j) => (
                                        <td key={j} className="is-size-7">
                                            <Cell cell={cell} i={i} j={j} tick={tick} />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
};

export { AllPathsModal };
export default AllPaths;
