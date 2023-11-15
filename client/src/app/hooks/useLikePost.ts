import { persist, devtools } from 'zustand/middleware';
import create from 'zustand';

interface Types {
    infoPosts: any[];
    pressLike : (contentId : any) => void;
    cancelLike : (contentId : any) => void;
    checkLike: (contentId : any) => boolean;
};

let store: any = (set: any) => {
    return {
        infoPosts : [],
        pressLike : (contentId : any) => {
            set((state: any) => ({ infoPosts: [...state.infoPosts, contentId] }));
        } ,
        cancelLike : (contentId : any) => {
            set((state: any) => {
                const result = state.infoPosts.filter((i : any) => i !== contentId);
                return { infoPosts: [...result] }
            });
        },
        checkLike: (contentId : any) => {
            let status = false;
            set((state: any) => {
                const result = state.infoPosts.find((i: any) => i === contentId);
                if (result) status = true;
                return state;
            });
            return status;
        },
    }
};

store = devtools(persist(store, { name: "likePost" }));

const useLikePost = create<Types>(store);

export default useLikePost;