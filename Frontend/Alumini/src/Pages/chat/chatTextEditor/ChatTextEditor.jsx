import React from "react";
import { Box, IconButton, InputBase, Paper, Divider } from "@mui/material";
import PropTypes from "prop-types";
import { useRef } from "react";
import { useEffect } from "react";
import "./ChatInput.css";


const ChatInput = ({
  icons,
  placeholder,
  onSendClick,
  onFileAttach,
  onEmojiClick,
  onBoldClick,
  onItalicClick,
  onUnderlineClick,
  onRemoveClick,
  onBulletListClick,
  onNumberListClick,
  iconStyles,
  inputValue,
  inputStyles,
  paperStyles,
  onInputChange,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current && inputValue !== inputRef.current.innerText) {
      inputRef.current.innerText = inputValue;
    }
  }, [inputValue]);

  const execCommand = (command) => {
    document.execCommand(command, false, null);
  };
  const toggleBold = () => {
    const selection = window.getSelection();
    if (selection.rangeCount) {
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");
      span.style.fontWeight =
        range.startContainer.parentNode.style.fontWeight === "bold"
          ? "normal"
          : "bold";
      range.surroundContents(span);
    }
  };
  return (
    <Paper
      variant="outlined"
      sx={{
       mt:1,
       border:'none', width:"58vw", 
      }}
    >
{/*     
      <Divider
        sx={{
          width: "100%",
          height: "1px",
          position: "absolute",
          bottom: "px",
          backgroundColor: "#f2f2f2",
        }}
      /> */}
      <Box sx={{display:'flex', alignItems:'center'}}>
      <IconButton
            size="small"
            sx={{ color: iconStyles.color,mr:"10px",ml:"10px" }}
            onClick={onEmojiClick}
          >
            {icons.emoji}
          </IconButton>

      <IconButton
            size="small"
            sx={{ color: iconStyles.color, transform: "rotate(35deg)",mr:"10px" }}
            onClick={onFileAttach}
          >
            {icons.attach}
          </IconButton>
        
      <Box
        display="flex"
        sx={{ flexDirection: "row", alignItems: "center", width: "100%", m:1 }}
      >
        <div
          ref={inputRef}
          contentEditable
          suppressContentEditableWarning
          onInput={onInputChange}
          style={{
            // flex: 1,
            display: "flex",
            lineHeight: "20px",
            padding: "7px",
            fontSize: "16px",
            color: "#706e6e",
            fontWeight: 400,
            fontFamily: "Poppins",
            width: "100%",
            minHeight: "20px",
            alignItems: "center",
            outline: "none",
            border:"1px solid #BEBEBE",
            borderRadius: "3px"
          }}
          data-placeholder="Type a message..."
          onFocus={(e) => {
            if (e.target.innerText === "Type a message...") {
              e.target.innerText = "";
            }
          }}
          onBlur={(e) => {
            if (e.target.innerText.trim() === "") {
              e.target.innerText = "Type a message...";
            }
          }}
        >
          Type a message... {/* This is the default placeholder text */}
        </div>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            size="small"
            sx={{ color: iconStyles.color,mr:"10px",ml:"10px" }}
            onClick={onSendClick}
          >
            {icons.send}
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};

ChatInput.propTypes = {
  icons: PropTypes.shape({
    bold: PropTypes.node.isRequired,
    italic: PropTypes.node.isRequired,
    underline: PropTypes.node.isRequired,
    remove: PropTypes.node.isRequired,
    bulletList: PropTypes.node.isRequired,
    numberList: PropTypes.node.isRequired,
    attach: PropTypes.node.isRequired,
    emoji: PropTypes.node.isRequired,
    send: PropTypes.node.isRequired,
  }).isRequired,
  placeholder: PropTypes.string,
  onSendClick: PropTypes.func,
  onFileAttach: PropTypes.func,
  onEmojiClick: PropTypes.func,
  onBoldClick: PropTypes.func,
  onItalicClick: PropTypes.func,
  onUnderlineClick: PropTypes.func,
  onRemoveClick: PropTypes.func,
  onBulletListClick: PropTypes.func,
  onNumberListClick: PropTypes.func,
  iconStyles: PropTypes.object,
  inputStyles: PropTypes.object,
  paperStyles: PropTypes.object,
  onInputChange: PropTypes.func,
};

ChatInput.defaultProps = {
  placeholder: "Type in your message...",
  onSendClick: () => {},
  onFileAttach: () => {},
  onEmojiClick: () => {},
  onBoldClick: () => {},
  onItalicClick: () => {},
  onUnderlineClick: () => {},
  onRemoveClick: () => {},
  onBulletListClick: () => {},
  onNumberListClick: () => {},
  iconStyles: { color: "#b3b3b3" },
  inputStyles: {},
  paperStyles: {},
  onInputChange: () => {},
};

export default ChatInput;
