import { Form, Input, Button, Typography, Upload, Card, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Formik, Form as FromM, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import { useState } from 'react';
import { Account, Register } from '../app/models/Account';
import { useAppDispatch } from '../app/stores/configureStore';
import { register } from '../app/stores/accountSlice';
import { Result } from '../app/models/Result';
import AppSwal from '../app/components/AppSwal';

const emailValidation = /^[a-zA-Z0-9_\\.]+@[a-zA-Z]+\.[a-zA-Z0-9\\.]+$/;
const SignupSchema = Yup.object().shape({
    Email: Yup.string()
        .required('Required Email')
        .matches(emailValidation, "Invalid Email Format"),
    Password: Yup.string()
        .required('Required Password')
        .min(8, "Password must be more than 8 characters"),
    FirstName: Yup.string().required('Required FirstName'),
    LastName: Yup.string().required('Required LastName'),
});

const value: Register = {
    Email: '', 
    Password: '',
    FirstName: '',
    LastName: '',
    FormFiles: ''
};

const RegisterPage = () => {

    const { Title } = Typography;

    const navigate = useNavigate();

    const [imageFile, setImageFile] = useState<UploadFile | null>(null);

    const dispatch = useAppDispatch();

    const onSubmit = async (data: Register) => {
        await dispatch(register(data))
            .unwrap()
            .then((result: Result<Account>) => {
                if (result.success && !result.message)
                    AppSwal({
                        icon: 'success',
                        title: 'บันทึกข้อมูลสำเร็จ',
                        onThen: () => navigate("/")
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
            <Card title={<Title level={2}>Register</Title>} bordered={false} style={{ width: "30%" }}>
                <Formik
                    initialValues={value}
                    validationSchema={SignupSchema}
                    onSubmit={(values , { setSubmitting }) => { 
                        setTimeout(() => {
                            onSubmit(values);
                            setSubmitting(false);
                          }, 500);
                     }}
                >
                    {({
                        touched,
                        errors,
                        handleChange,
                        handleBlur,
                        values ,
                        setFieldValue ,
                        isSubmitting
                    }) => (
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

                            <Form.Item>
                                <Input
                                    prefix={<UserOutlined />}
                                    placeholder="FirstName"
                                    name="FirstName"
                                    status={touched.FirstName && errors.FirstName
                                        ? "error" : ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.FirstName} />
                                <ErrorMessage name="FirstName" component="div" className="text-danger" />
                            </Form.Item>

                            <Form.Item>
                                <Input
                                    prefix={<UserOutlined />}
                                    placeholder="LastName"
                                    name="LastName"
                                    status={touched.LastName && errors.LastName
                                        ? "error" : ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.LastName}
                                />
                                <ErrorMessage name="LastName" component="div" className="text-danger" />
                            </Form.Item>

                            <Form.Item>
                                <Row >
                                    <Col span={8}>
                                        <Upload
                                            beforeUpload={() => false}
                                            accept="image/png, image/jpeg"
                                            listType="picture"
                                            name="FormFiles"
                                            showUploadList={false}
                                            onChange={(e: UploadChangeParam) => {
                                                setImageFile(e.file)
                                                setFieldValue("FormFiles" , e.file)
                                            }}
                                        >
                                            <Button icon={<UploadOutlined />}>Upload your avatar</Button>
                                        </Upload>
                                    </Col>
                                    <Col span={8} offset={8} >
                                        {imageFile && (
                                            <img
                                                src={URL.createObjectURL(imageFile as any)}
                                                alt="your avatar"
                                                style={{
                                                    maxWidth: '100%',
                                                    maxHeight: '8rem',
                                                }}
                                            />
                                        )}
                                    </Col>
                                </Row>
                            </Form.Item>

                            <Form.Item >
                                <Button loading={isSubmitting} type="primary" htmlType="submit" className="register-form-button">
                                    Register
                                </Button>
                                <Button type="link" onClick={() => navigate(-1)}>
                                    Back
                                </Button>
                            </Form.Item>

                        </FromM>
                    )}
                </Formik>
            </Card>
        </div>

    )
}

export default RegisterPage