import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
interface ApiResponse<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}



export const useGetApi = <T>(url: string, dataExtrator: (arg: unknown) => T, page?: number): ApiResponse<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log(import.meta.env.VITE_BASE_URL, import.meta.env.VITE_API_KEY, url, "url¯")
        const fetchData = async () => {
            setLoading(true);
            const axiosConfig = {
                url: `${import.meta.env.VITE_BASE_URL}/${url}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
                },
            };

            try {
                const response = await axios.request<T>(axiosConfig);
                const extractedData = dataExtrator(response?.data);
                setData(extractedData);
                setLoading(false);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    // Handle Axios-specific errors
                    const axiosError = error as AxiosError;
                    console.error("Axios error:", axiosError.response?.data);
                    setError(JSON.stringify(axiosError.response?.data));
                } else {
                    // Handle non-Axios errors
                    console.error("Unknown error:", error);
                    setError(JSON.stringify(error));
                }
                setLoading(false);
            }
        };

        fetchData();
    }, [url, page]);

    return { data, loading, error };
};