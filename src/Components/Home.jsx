import React, { useState, useEffect } from 'react'

const Home = () => {
    const [veh, setveh] = useState([]);
    const [fd, setfd] = useState([]);
    const [type, settype] = useState("All");
    const [name, setname] = useState("");
    const [rd, setrd] = useState([]);
    const [pop, setpop] = useState(false);
    const [arr, setarr] = useState([]);
    const [id, setid] = useState(988);


    useEffect(() => {
        fetch(
            "https://vpic.nhtsa.dot.gov/api/vehicles/GetWMIsForManufacturer/hon?format=json"
        )
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setveh(data.Results);
            });
    }, [setveh]);

    useEffect(() => {
        if (type === "All") {
            setfd(veh);
        } else {
            fetch(
                `https://vpic.nhtsa.dot.gov/api/vehicles/GetWMIsForManufacturer/hon?vehicleType=${type}&format=json`
            )
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    setfd(data.Results);
                });
        }
    }, [veh, type, setfd]);

    useEffect(() => {
        if (name === "") {
            setrd(fd);
        } else {
            let arr = fd.filter((item, i) =>
                item.Name.includes(name.toLocaleUpperCase())
            );
            setrd(arr);
        }
    }, [fd, name, setrd]);

    useEffect(() => {
        let pp = rd.find((item, i) => {
            return (i = id);
        });
        setarr(pp);
    }, [id, rd, setarr]);


    return (
        <div className='container p-2'>
            <div className='center'>
                <h1 class="text-center">VEHICLE MANUFACTURERS</h1>
            </div>

            {pop ? (
                <div>
                    <div className="div1">
                        <p onClick={() => setpop(false)} style={{ float: "right", color: "black" }}>X</p>
                        <p>{arr.Name}</p>
                        <p>{arr.WMI}</p>
                    </div>
                    ;
                </div>
            ) : (
                ""
            )}

            <div className='row d-flex justify-content-between'>
                <div class="input-group rounded w-25">
                    <span id="sp1">
                        <label htmlFor="search">Search:</label>
                        <input
                            type="text"
                            id="search"
                            onChange={(e) => setname(e.target.value)}
                        />
                    </span>
                </div>


                <span class="dropdown w-25">
                    <label htmlFor="filter">Filter by vehicle type:</label>
                    <select
                        name="VehicleType"
                        id="filter"
                        onChange={(e) => settype(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Passenger Car">Passenger Car</option>
                        <option value="Multipurpose Passenger Vehicle (MPV)">
                            Multipurpose Passenger Vehicle (MPV)
                        </option>
                        <option value="Motorcycle">Motorcycle</option>
                        <option value="Trailer">Trailer</option>
                        <option value="Low Speed Vehicle (LSV)">
                            Low Speed Vehicle (LSV)
                        </option>
                    </select>
                </span>
            </div>


            <div className='table mt-3'>
                <table class="table table-striped">
                    <thead>
                        <tr class=" bg-primary">
                            <th scope="col">Name</th>
                            <th scope="col">Country</th>
                            <th scope="col">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rd.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td onClick={() => { setpop(true); setid(i); }}>{item.Name}</td>
                                    <td>{item.Country}</td>
                                    <td>{item.VehicleType}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home