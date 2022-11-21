import { useState, useEffect } from "react";
import './fetch.scss';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

const Fetch = () => {
    const API_KEY = 'vRmThn0recafXa2zG85jmdcC90n1QYdD0MY44ZVp';
    const API_URL = 'https://api.nasa.gov/mars-photos/api/v1/rovers/';
    const API_PARAMS = '?&sol=1000&api_key=';


    const [value, setValue] = useState('');
    const [valueCamera, setValueCamera] = useState('');
    const [sol, setSol] = useState(1000);

    const [data, setData] = useState([]);
    const [count, setCount] = useState(10);
    const [rovers, setRovers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [photos, setPhotos] = useState('');
    const [apiUrl, setApiUrl] = useState(API_URL + API_PARAMS + API_KEY);

    const ReturnData = () => {
        let res = rovers.map(item => <button className="mt-5 bg-sky-500 rounded-full text-white hover:bg-sky-700 ml-5 p-5 w-40" key={item.id} onClick={() => onRover(item.name)}>{item.name}</button>);

        const resPhotos = data.photos ? data.photos.slice(0, count).map(item => <img key={item.id} src={item.img_src} alt={item.rover.name}></img>) : '';
        return (
            <div>

                {res}
                <div className="mt-10 grid grid-cols-3 gap-4">
                    {resPhotos}

                </div>
                <button onClick={loadMore} className={data.photos ? 'mt-5 bg-sky-500 rounded-full text-white hover:bg-sky-700 ml-5 p-5 w-40' : 'hidden mt-5 bg-sky-500 rounded-full text-white hover:bg-sky-700 ml-5 p-5 w-40'}>Load more</button>

            </div>

        );
    }

    const loadMore = () => {
        setCount(count + 10);
    }

    const onRover = async (nameClass, onRover) => {
        const rover = document.getElementsByClassName(nameClass);
        for (let i = 0; i < rover.length; i++) {
            if (rover[i].value === onRover) {
                rover[i].className = `filter_link ${nameClass} active`;
            } else {
                rover[i].className = `filter_link ${nameClass} rover`;
            }
        }
    }

    useEffect(() => {
        gatData(API_URL + photos + API_PARAMS + API_KEY);
    }, [photos])

    useEffect(() => {
        if (!loading && photos === '') {
            ReturnData();
        }
    }, [loading])

    const gatData = (url) => {
        setLoading(true);
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => console.error(err))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(value, valueCamera, sol)
        const url = API_URL + `${value}/photos?&sol=${sol}&camera=${valueCamera}&api_key=` + API_KEY;
        setApiUrl(url);
        gatData(url)
    }

    return (
        <>
            <div className="pt-5 lg:grid lg:grid-cols-4 lg:gap-4">
                <div className="filter col-span-1">
                    <form onSubmit={handleSubmit}> 
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel onChange={() => setValue('curiosity')} value="curiosity" control={<Radio />} label="Curiosity" />
                            <FormControlLabel onChange={() => setValue('spirit')} value="spirit" control={<Radio />} label="Spirit" />
                            <FormControlLabel onChange={() => setValue('opportunity')} value="opportunity" control={<Radio />} label="Opportunity" />
                        </RadioGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Camera</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel onChange={() => setValueCamera('FHAZ')} value="FHAZ" control={<Radio />} label="Front Hazard Avoidance Camera" />
                            <FormControlLabel onChange={() => setValueCamera('RHAZ')} value="RHAZ" control={<Radio />} label="Rear Hazard Avoidance Camera" />
                            <FormControlLabel onChange={() => setValueCamera('MAST')} value="MAST" control={<Radio />} label="Mast Camera" />
                            <FormControlLabel onChange={() => setValueCamera('CHEMCAM')} value="CHEMCAM" control={<Radio />} label="Chemistry and Camera Complex" />
                            <FormControlLabel onChange={() => setValueCamera('MAHLI')} value="MAHLI" control={<Radio />} label="Mars Hand Lens Imager" />
                            <FormControlLabel onChange={() => setValueCamera('MARDI')} value="MARDI" control={<Radio />} label="Mars Descent Imager" />
                            <FormControlLabel onChange={() => setValueCamera('NAVCAM')} value="NAVCAM" control={<Radio />} label="Navigation Camera" />
                            <FormControlLabel onChange={() => setValueCamera('PANCAM')} value="PANCAM" control={<Radio />} label="Panoramic Camera" />
                            <FormControlLabel onChange={() => setValueCamera('MINITES')} value="MINITES" control={<Radio />} label="Miniature Thermal Emission Spectrometer (Mini-TES)" />
                        </RadioGroup>
                        <FormLabel id="demo-radio-buttons-group-label">Camera</FormLabel>
                        <input type="number" onChange={(e) => setSol(e.target.value)} className="border-2"></input>
                        <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
                        Check Answer
                        </Button>
                    </FormControl>
                    </form>
                </div>
                <div className="col-span-3">
                    <ReturnData />
                </div>
            </div>
        </>
    )
}

export default Fetch;