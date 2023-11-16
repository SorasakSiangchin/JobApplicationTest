import React, { useEffect, useState } from 'react';
import { List, Avatar, Form, Input, Button, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../app/stores/configureStore';
import { createComment, getCommentByContentId } from '../app/stores/commentSlice';
import { Comment } from '../app/models/Comment';

interface Prop {
    setOpen : Function ,
    open : boolean ,
    contentId : string ,
}



const ModalComment = ({ open , setOpen , contentId} : Prop) => {

  const dispatch = useAppDispatch();
  // const { commentsLoaded } = useAppSelector(state => state.comment);
  const { account } = useAppSelector(state => state.account);
  const [comments , setComments] = useState<Comment[]>([]);
  useEffect(() => {
    loadComment();
  } ,[dispatch , open]);

  const handleCommentSubmit = (values: { comment: string }) => {
    dispatch(createComment({
      AccountId : account ? account.id : "",
      ContentId : contentId ,
      Message :values.comment
    })).then(() => loadComment());
  };

  const loadComment = async () => {
    const { data , success } = await dispatch(getCommentByContentId(contentId)).unwrap();
    if(success) setComments(data);
  }

  return (
    <>
    <Modal
        title="comments"
        centered
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        
        footer={false}
        width={"40rem"}
      >
     <CommentList comments={comments} />
      <CommentForm onSubmit={handleCommentSubmit} />
      </Modal>
    </>
  )
}


const CommentList: React.FC<{ comments: Comment[] }> = ({ comments }) => (
  <List
    dataSource={comments}
    itemLayout="horizontal"
    renderItem={(comment) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar icon={<UserOutlined />} src={comment.account.profileImageUrl} />}
          title={comment.account.firstName+' '+comment.account.lastName}
          description={comment.message}
        />
      </List.Item>
    )}
  />
);

const CommentForm: React.FC<{ onSubmit: (values: { comment: string }) => void }> = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = (values: { comment: string }) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="comment" rules={[{ required: true, message: 'Please input your comment!' }]}>
        <Input.TextArea rows={4} placeholder="Write a comment..." />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ModalComment