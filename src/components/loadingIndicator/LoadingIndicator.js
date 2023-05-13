import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Spinner } from "react-bootstrap";

const LoadingIndicator = (WrappedComponent) => {
    const LoadingIndicator = ({ ...props }) => {
        const [isLoading, setIsLoading] = useState(false);
        const router = useRouter();

        useEffect(() => {
            const handleStart = () => setIsLoading(true);
            const handleComplete = () => setIsLoading(false);

            router.events.on("routeChangeStart", handleStart);
            router.events.on("routeChangeComplete", handleComplete);
            router.events.on("routeChangeError", handleComplete);

            return () => {
                router.events.off("routeChangeStart", handleStart);
                router.events.off("routeChangeComplete", handleComplete);
                router.events.off("routeChangeError", handleComplete);
            };
        }, [router]);

        return (
            <>
                {isLoading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                        <Spinner animation="grow" variant="warning" className="me-3"/>
                        <Spinner animation="grow" variant="success" className="me-3"/>
                        <Spinner animation="grow" variant="primary" className="me-3"/>
                    </div>
                ) : (
                    <WrappedComponent {...props} />
                )}
            </>
        );
    };

    return LoadingIndicator;
};

export default LoadingIndicator;
