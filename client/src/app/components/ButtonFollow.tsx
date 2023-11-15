import { useEffect, useState } from "react";
import { TrackingRequest } from "../models/Tracking";
import { useAppDispatch } from "../stores/configureStore";
import { follow, getSinglyTracking, unFollow } from "../stores/trackingSlice";
import { Button } from "antd";
import { reset } from "../stores/contentSlice";
import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { ButtonType } from "antd/es/button";

interface Prop {
    accountId : any;
    friendId : any;
    type : ButtonType;
}

const ButtonFollow = ({ accountId, friendId , type }: Prop) => {
    const [checkFollow, setCheckFollow] = useState<boolean>();
    const data = { accountId, friendId };
    const trackingRequest : TrackingRequest = { AccountId: accountId, FriendId: friendId }
    const dispatch = useAppDispatch();

    useEffect(() => {
        loadTracking();
    }, []);

    const loadTracking = async () => {
        const { success } = await dispatch(getSinglyTracking(data)).unwrap();
        setCheckFollow(success);
        dispatch(reset());
    };

    const submitFollow = async () => {
        const { success } = await dispatch(follow(trackingRequest))
            .unwrap();
        if(success) loadTracking();
    };

    const submitUnFollow = async () => {
        const { success } = await dispatch(unFollow(trackingRequest))
            .unwrap();
        if(success) loadTracking();
    };
    return <Button
        type={type}
        icon={!checkFollow ? <UserAddOutlined /> : <UserDeleteOutlined />}
        onClick={() =>{
            !checkFollow ? submitFollow() :submitUnFollow();
        }}
    >
       { !checkFollow ? "Follow" : "UnFollow"}
    </Button>
};

export default ButtonFollow;