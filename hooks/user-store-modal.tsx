import { create} from "zustand";

interface useStoreModalStore{
    isOpen:boolean,
    onOpen:()=>void;
    onClose :()=>void
}

//here set is generally a useState state changer 
export const useStoreModal = create<useStoreModalStore>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})
}));

