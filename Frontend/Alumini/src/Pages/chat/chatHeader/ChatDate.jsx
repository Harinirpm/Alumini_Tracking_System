const ChatDate = ({ day }) => {
    return (
      <div
        style={{
          width: "100%",
          borderTop: "2px dotted lightgray",
          position: "relative",
          marginTop: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-0.8rem", 
            left: "50%",
            transform: "translateX(-50%)", 
            fontSize: "12px",
            padding: "0.2rem",
            backgroundColor: "white",
            border: "1px solid lightgray",
            paddingInline: "0.5rem",
            borderRadius: "15px",
            color: "#5b6565",
            fontFamily: "Poppins",
            zIndex: "1",
          }}
        >
          {day}
        </div>
      </div>
    );
  };
  
  export default ChatDate;
  