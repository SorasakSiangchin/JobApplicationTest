import { Badge, Button, Card, Col, Input, Modal, Row, Space, Upload, notification } from 'antd'
import { Formik, Form, ErrorMessage } from 'formik';
import { RcFile } from 'antd/lib/upload/interface';
import { UploadFile } from 'antd/lib/upload/interface';
import { UploadOutlined, CloseCircleFilled } from '@ant-design/icons';
import { ContentRequest } from '../app/models/Content';
import { useState } from 'react';
import { useAppDispatch } from '../app/stores/configureStore';
import { createContent } from '../app/stores/contentSlice';
import { getCurrentAccount } from '../app/stores/accountSlice';

interface Prop {
    setOpen: Function,
    open: boolean,
    accountId: any,
}

const MAX_FILE_COUNT = 2;

const ModalFormContent = ({ accountId, open, setOpen }: Prop) => {
    const dispatch = useAppDispatch();
    const value: ContentRequest = {
        AccountId: accountId,
        FormFiles: "",
        Message: "",
    };

    const [fileList, setFileList] = useState<UploadFile[]>([]);


    const handleCreateContent = (values : ContentRequest) => {
        dispatch(createContent(values)).then(() => dispatch(getCurrentAccount()))
    };

    return (
        <Formik
            initialValues={value}
            onSubmit={values => {
                handleCreateContent(values);
            }}
        >
            {({
                touched,
                errors,
                handleChange,
                handleBlur,
                values,
                setFieldValue,
                resetForm ,
                submitForm
            }) => {
                const resetModal = () =>{
                    setOpen(false);
                    setFileList([]);
                    resetForm();
                };
                
                const beforeUpload = (file: RcFile) => {
                    const newFileList = [...fileList, file];
                    if (newFileList.length > MAX_FILE_COUNT) {
                        notification.error({
                            message: 'Error',
                            description: 'You can only upload up to 2 files.',
                        });
                        return false;
                    }
                    setFileList(newFileList);
                    setFieldValue("FormFiles", newFileList)
                    return false;
                };

                const onRemove = (file: UploadFile) => {
                    const newFileList = fileList.filter((item) => item.uid !== file.uid);
                    setFileList(newFileList);
                    setFieldValue("FormFiles", newFileList)
                };

                return <Form>
                    <Modal
                        title="Create your post"
                        open={open}
                        onCancel={resetModal}
                        footer={false}
                    >
                        <Space direction="vertical" style={{ width: "100%" }}>
                            <Input.TextArea
                                rows={4}
                                placeholder="messages"
                                name="Message"
                                value={values.Message}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                status={touched.Message && errors.Message
                                    ? "error" : ""}
                            />
                            <ErrorMessage name="Message" component="div" className="text-danger" />
                            <Upload
                                beforeUpload={beforeUpload}
                                listType="picture"
                                accept="image/png, image/jpeg"
                                showUploadList={false}
                            >
                                {fileList.length < MAX_FILE_COUNT && (
                                    <Button icon={<UploadOutlined />}>You can add only 2 pictures. </Button>
                                )}
                            </Upload>
                            <Row >
                                {fileList?.length > 0 && (
                                    fileList.map((file, index) =>
                                        <Col   key={index} span={12} style={{ padding: "0.2rem" }}>
                                            <Badge count={<CloseCircleFilled onClick={() => onRemove(file)} />}>
                                                <Card >
                                                    <img
                                                        style={{ width: '100%', height: '10rem' }}
                                                        src={URL.createObjectURL(file as any)} />
                                                </Card>
                                            </Badge>
                                        </Col>
                                    )
                                )}
                            </Row >
                            <div style={{
                                display: "flex",
                                alignContent: "end",
                                justifyContent: "end"
                            }}>
                                <Button 
                                htmlType='submit' 
                                disabled={!values.Message ? true : false} 
                                type='primary'
                                onClick={() => submitForm().then(() => resetModal())}>
                                    Post
                                </Button>
                            </div>
                        </Space>
                    </Modal>

                </Form>
            }

            }
        </Formik>
    )
}

export default ModalFormContent