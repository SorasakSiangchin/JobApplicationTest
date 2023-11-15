
import { Form, Input, Button, Typography, Card } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Formik, Form as FromM, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Account, Login } from '../app/models/Account';
import { useAppDispatch } from '../app/stores/configureStore';
import { Result } from '../app/models/Result';
import { login } from '../app/stores/accountSlice';
import AppSwal from '../app/components/AppSwal';

const emailValidation = /^[a-zA-Z0-9_\\.]+@[a-zA-Z]+\.[a-zA-Z0-9\\.]+$/;
const SignupSchema = Yup.object().shape({
    Email: Yup.string()
        .required('Required Email')
        .matches(emailValidation, "Invalid Email Format"),
    Password: Yup.string()
        .required('Required Password')
        .min(8, "Password must be more than 8 characters")
});

const value: Login = { Email: '', Password: '' };

const LoginPage = () => {

    const { Title } = Typography;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onSubmit = async (data: Login) => {
        await dispatch(login(data))
            .unwrap()
            .then((result: Result<Account>) => {
                if (result.success && !result.message)
                    AppSwal({
                        icon: 'success',
                        title: 'เข้าสู่ระบบสำเร็จ',
                        onThen: () => navigate("/feed")
                    });
                else
                    AppSwal({
                        icon: 'error',
                        title: result.message,
                        onThen: null
                    });

            });
    };

    return (
        <div className='middle-container'>
            <Card title={<Title level={2}>Login</Title>} bordered={false} style={{ width: "30%" }}>

                <Formik
                    initialValues={value}
                    validationSchema={SignupSchema}
                    onSubmit={(values) => {
                        onSubmit(values)
                    }}
                >
                    {({ errors, touched, handleChange, handleBlur, values }) => (
                        <FromM>
                            <Form.Item>
                                <Input
                                    prefix={<MailOutlined />}
                                    placeholder="Email"
                                    name="Email"
                                    status={touched.Email && errors.Email
                                        ? "error" : ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.Email}
                                />
                                <ErrorMessage name="Email" component="div" className="text-danger" />
                            </Form.Item>
                            <Form.Item>
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder="Password"
                                    name="Password"
                                    status={touched.Password && errors.Password
                                        ? "error" : ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.Password}
                                />
                                <ErrorMessage name="Password" component="div" className="text-danger" />
                            </Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                            >
                                Log in
                            </Button>
                            <Button type="link" onClick={() => navigate("/register")}>
                                Register
                            </Button>
                        </FromM>
                    )}
                </Formik>
            </Card>
        </div>
    )
}

export default LoginPage