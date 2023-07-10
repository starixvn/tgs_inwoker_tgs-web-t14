import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import OnlineUserDisplayer from "../../../Share/online-user-displayer";

const AnnounceContainer = styled.div`
  margin: 0 auto;
`;

const MarqueeContainer = styled.div`
  width: 890px;
  white-space: nowrap;

  font-size: 18px;
  color: ${({ theme }) =>
    theme.wapSecondary ? theme.wapSecondary : theme.secondary};

  line-height: 26px;
  display: grid;
  align-items: center;
  gap: 10px;
  grid-template-columns: auto 35%;
`;

function Marquee(props) {
  return (
    <AnnounceContainer>
      <MarqueeContainer>
        <div>
          {props.ui.marquees && props.ui.marquees.length > 0 && (
            <marquee style={{ marginTop: "10px" }}>
              {props.ui.marquees.map((row, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      display: "inline",
                      whiteSpace: "nowrap",
                      wordBreak: "keep-all",
                      overflow: "visible",
                    }}
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"* "}
                    {row.localization !== null && row.localization.content
                      ? row.localization.content
                      : row.content}
                  </div>
                );
              })}
            </marquee>
          )}
        </div>
        <div>
          <OnlineUserDisplayer color={"#fff"} iconOnly={true} />
        </div>
      </MarqueeContainer>
    </AnnounceContainer>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {};
};
const mapStateToProps = (state) => {
  return {
    ui: state.ui,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Marquee);
