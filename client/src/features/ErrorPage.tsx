import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
    const navigate = useNavigate();
    return (
        <>
            <Result
                status="500"
                title="error 404 page not found"
                subTitle="Sorry, something went wrong."
                extra={
                    <Button type="primary" onClick={() => navigate("/")}>Back Home</Button>
                }
                style={{ marginTop: '50px' }}
            >
            </Result>
        </>
    )
}

export default ErrorPage