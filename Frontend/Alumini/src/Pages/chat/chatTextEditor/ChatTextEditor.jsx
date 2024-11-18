import React from "react";
import { Box, IconButton, InputBase, Paper, Divider } from "@mui/material";
import PropTypes from "prop-types";
import { useRef } from "react";
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
  inputStyles,
  paperStyles,
  onInputChange,
}) => {
  const inputRef = useRef(null);

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
        ...paperStyles,
        alignItems: "center",
        p: 1,
        borderRadius: "10px",
        width: "93%",
        position: "absolute",
        border: "1px solid #e6e6e6",
        bottom: "20px",
        mt: "20px",
        ml: "20px",
        padding: "none",
        mr: "10px",
        marginTop:'-5rem'
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f2f2f2",
          position: "relative",

        }}
      >
        <IconButton
          sx={{ padding: "2px", color: iconStyles.color, mt: "5px", mb: "5px" }}
          onClick={toggleBold}
        >
          {icons.bold}
        </IconButton>
        <IconButton
          sx={{ padding: "2px", color: iconStyles.color, mt: "5px", mb: "5px" }}
          onClick={() => execCommand("italic")}
        >
          {icons.italic}
        </IconButton>
        <IconButton
          sx={{ padding: "2px", color: iconStyles.color, mt: "5px", mb: "5px" }}
          onClick={() => execCommand("underline")}
        >
          {icons.underline}
        </IconButton>
        <IconButton
          sx={{ padding: "2px", color: iconStyles.color, mt: "5px", mb: "5px" }}
          onClick={() => execCommand("removeFormat")}
        >
          {icons.remove}
        </IconButton>
        <IconButton
          sx={{ padding: "2px", color: iconStyles.color, mt: "5px", mb: "5px" }}
          onClick={() => execCommand("insertUnorderedList")}
        >
          {icons.bulletList}
        </IconButton>
        <IconButton
          sx={{ padding: "2px", color: iconStyles.color, mt: "5px", mb: "5px" }}
          onClick={() => execCommand("insertOrderedList")}
        >
          {icons.numberList}
        </IconButton>
      </Box>

      <Divider
        sx={{
          width: "100%",
          height: "1px",
          position: "absolute",
          bottom: "px",
          backgroundColor: "#f2f2f2",
        }}
      />

      <Box
        display="flex"
        sx={{ flexDirection: "row", alignItems: "center", width: "100%" }}
      >
        <div
          ref={inputRef}
          contentEditable
          suppressContentEditableWarning
          onInput={onInputChange}
          style={{
            // flex: 1,
            display: "flex",
            padding: "7px",
            fontSize: "16px",
            color: "#706e6e",
            fontWeight: 100,
            fontFamily: "Poppins",
            width: "100%",
            minHeight: "40px",
            alignItems: "center",
            outline: "none",
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

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            size="small"
            sx={{ color: iconStyles.color, transform: "rotate(35deg)" }}
            onClick={onFileAttach}
          >
            {icons.attach}
          </IconButton>
          <IconButton
            size="small"
            sx={{ color: iconStyles.color }}
            onClick={onEmojiClick}
          >
            {icons.emoji}
          </IconButton>
          <IconButton
            size="small"
            sx={{ color: iconStyles.color }}
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
