import { Avatar, Button } from "@mui/material";
import { messages } from "../utils/messages";

interface IImageUploaderProps {
    imageUrl?: string;
}

const ImageUploader = ({ imageUrl }: IImageUploaderProps) => {

    return (
        <div className="">
            <Avatar src={imageUrl}/>
            <Button>{messages.imageUpload(!!imageUrl)}</Button>
        </div>
    )
};

export default ImageUploader;
