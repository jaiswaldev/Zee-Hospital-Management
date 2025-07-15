import { useRef, useState } from "react";
import { Image, Send, X } from "lucide-react";
import { toast } from "sonner";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

const MessageInput = ({ onSendMessage }) => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    await onSendMessage({ text: text.trim(), image: imagePreview });
    setText("");
    removeImage();
  };

  return (
    <div className="p-4 w-full border">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <Button onClick={removeImage} className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300">
              <X className="size-3" />
            </Button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <Input
            type="text"
            className="w-full input input-bordered input-sm sm:input-md"
            placeholder="Type your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <Input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <Button type="button" onClick={() => fileInputRef.current?.click()} className="btn-circle btn-sm sm:btn-md">
            <Image size={20} />
          </Button>
        </div>
        <Button type="submit" className="btn-sm btn-primary sm:btn-md" disabled={!text.trim() && !imagePreview}>
          <Send size={22} />
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;
