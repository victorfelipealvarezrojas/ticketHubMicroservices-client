import axios from 'axios'
import { useState } from 'react'


type props = {
    url: string;
    methos: string;
    body?: any;
    onSusses: (response: any) => void;
};

const useRequest = ({ url, methos, body, onSusses }: props) => {
    const [errors, setError] = useState(null);

    const doReques = async (props = {}) => {
        try {
            setError(null);
            const response = await axios[methos](url, { ...body, ...props });

            if (onSusses) {
                onSusses(response.data);
            }

            return response.data;
        } catch (error) {
            setError(
                <div className="alert alert-danger">
                    <h4>Error...</h4>
                    <ul className="my-0">
                        {error.response.data.errors.map((err) => <li key={err.message}>{err.message}</li>)}
                    </ul>
                </div>
            );
            //throw error;
        };
    };

    return {
        doReques,
        errors
    };
};

export default useRequest;
