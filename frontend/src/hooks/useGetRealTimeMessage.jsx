import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessages } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
  const { socket } = useSelector((store) => store.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessages = (newMessage) => {
      dispatch(addMessages(newMessage));
    };

    socket.on("newMessage", handleNewMessages);

    return () => {
      socket.off("newMessage", handleNewMessages);
    };
  }, [socket, dispatch]);
};

export default useGetRealTimeMessage;
