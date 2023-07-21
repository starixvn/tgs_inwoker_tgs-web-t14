import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { AppHistory } from "../../../history/History";

import { GameService } from "../../../api-services/services/GameService";
import { gameAction } from "../../../api-services/actions/gameAction";
import { GameTypeEnum, SlotFilterType } from "../../../api-services/utils/Enum";
import { SHOW_LOGIN } from "../../../api-services/constant/actionType";

import SlotAllPNG from "../../../assets/images/slot-all.png";
import SlotAllInactivePNG from "../../../assets/images/slot-all-inactive.png";

import SlotBookmark1PNG from "../../../assets/images/slot-bookmark-1.png";
import SlotBookmark2PNG from "../../../assets/images/slot-bookmark-2.png";

import Loading from "../../../components/App/Loading";

import i18n from "../../../utils/i18n";
import config from "../../../config/config";
import Common from "../../../utils/Common";
import GameLister from "../Home/game-lister";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import ExpandMoreOutlined from "@material-ui/icons/ExpandMoreOutlined";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import JackpotContainer from "../Home/jackpot-section/jackpot-content";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Container = styled.div`
  width: 100%;
  height: auto;
  min-height: 770px;
  position: relative;
`;
const Banner = styled.div`
  width: 1920px;
  height: 600px;
  background: url(${(props) =>
      process.env.PUBLIC_URL +
      `/assets/images/pcGamePage/slots/background-` +
      (props.type === GameTypeEnum.FISH
        ? "fish.png"
        : props.type === GameTypeEnum.SLOT
        ? "slots.png"
        : props.type === GameTypeEnum.TABLEGAME
        ? "electron.jpg"
        : " ")})
    no-repeat center;
  margin: 0 auto;
`;
const InnerWrap = styled.div`
  width: 1280px;
  min-height: 580px;
  border-radius: 10px;

  margin: 10px auto 50px auto;
  padding: 15px;
  box-sizing: border-box;
  overflow-y: auto;
  background: #252958;
`;
const GameTabContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 5px;
`;

const GameTab = styled.div`
  background: url(${(props) =>
      process.env.PUBLIC_URL +
      `/assets/images/pcGamePage/slots/` +
      props.img +
      (props.active === true ? `-white` : `-black`) +
      `.png`})
    no-repeat;
  background-position: center;
  background-size: contain;
  height: 60px;
  width: 100px;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
`;

const DisabledOverlay = styled.div`
  height: 100%;
  width: 100&;
  display: none;
  justify-content: center;
  align-items: center;
  cursor: not-allowed;
  background: rgba(0, 0, 0, 0.75);
  position: relative;
  color: white;
  font-weight: bold;
  pointer-event: none;
  text-transform: capitalize;
  z-index: 3;
  text-align: center;
`;
const GameTabButton = styled.div`
  width: 141px;
  height: 76px;
  border-radius: 10px;
  background-color: #eeeeee;
  margin-top: 5px;
  position: relative;
  float: left;

  &:hover {
    cursor: pointer;
    background-color: #1a1a1a;
  }
  &:hover ${GameTab} {
    background: url(${(props) =>
        process.env.PUBLIC_URL +
        `/assets/images/pcGamePage/slots/` +
        props.img +
        `-white.png`})
      no-repeat;
    background-position: center;
    background-size: 100%;
    height: 60px;
    width: 100px;
  }
  ${(props) =>
    props.active
      ? `  background-image: linear-gradient(to top, ` +
        props.theme.primaryGradient +
        `, ` +
        props.theme.primary +
        `);`
      : `  background-color: #EEEEEE;`};

  ${({ maintenance }) => {
    return maintenance
      ? `
              pointer-events: none !important;
            ${DisabledOverlay}{
              display: flex; 
              pointer-events: none !important;
            }
        
            ${GameTab}{
              pointer-events: none;
            
            }
            `
      : ``;
  }}
`;

const GameTabAll = styled(GameTabButton)`
  ${(props) =>
    props.active
      ? `  background: url(${SlotAllPNG}) , #1A1A1A;`
      : `  background: url(${SlotAllInactivePNG}) , rgb(238, 238, 238);`};
  background-repeat: no-repeat;
  background-size: 120ox auto;
  background-position: center;
  &:hover {
    cursor: pointer;
    background-color: url(${SlotAllPNG}), #1a1a1a;
  }
`;

const GameSubFilterContainer = styled.div`
  width: 1280px;
  height: 50px;
  margin: 10px auto 50px auto;
  display: flex;
  background: ${({ theme }) => theme.containerBg2};
  border-radius: 10px;
`;

const CategoryContainer = styled.div`
  height: 40px;
  font-size: 16px;
  margin: auto 10px;
  border-radius: 30px;
  width: auto;
  color: #fff;
  text-align: center;

  &:hover {
    cursor: pointer;
  }

  ${(props) =>
    props.active
      ? `
      color: ${props.theme.primary};
      `
      : `  
      `}
`;
const CategoryText = styled.div`
  margin-top: 8px;
`;

const SearchFilterItemContainer = styled.div`
  display: flex;
  width: 185px;
  height: 30px;
  border-radius: 5px;
  background-color: #fff;
  margin-top: 6px;
  border: 1px solid #ffffff;
  margin: auto 5px auto auto;
  & .MuiSvgIcon-root {
    fill: #000;
    color: #ffffff;
    margin: ato 0px auto 5px;
  }
`;
const SearchFilterItemInput = styled.input`
  background: transparent;
  border: none;
  color: #000;
  font-size: 16px;
  width: 130px;
  font-family: "Montserrat";
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #000;
    font-size: 16px;
    font-family: "Montserrat";
  }
  :-ms-input-placeholder {
    color: #000;
  }
`;

const GameListContainer = styled.div`
  width: 1280px;
`;

const GameHoverSelection = styled.div`
  width: 195px;
  height: 165px;
  position: absolute;
  left: 0;
  top: 0;
  display: none;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 2;
  color: #fff;
  text-align: center;
`;
const PlayButton = styled.div`
  position: absolute;
  top: 65px;
  width: 85px;
  height: 34px;
  border-radius: 16px;
  margin: 0 55px;
  padding-top: 7px;
  background: ${({ theme }) => theme.primary};
  filter: drop-shadow(1px 1px 8px ${({ theme }) => theme.primary}ba);
  text-transform: uppercase;
`;

const GameTagContainer = styled.div`
  width: 42px;
  height: 30px;
  border-radius: 0 10px;
  background-color: #cf2029;
  float: right;
  color: #ffffff;
  padding: 8px 0px 0px 12px;
  font-size: 12px;
`;
const ItemContainer = styled.div`
  width: 195px;
  height: 165px;
  border-radius: 10px;
  position: relative;
  float: left;
  margin: 5px 7px;
  &:hover {
    cursor: pointer;
  }
  &:hover ${GameHoverSelection} {
    display: block;
  }
  ${(props) =>
    `
  background-image:url(` +
    props.img +
    `)`};
  background-size: 195px 165px;
  background-repeat: no-repeat;
  background-position: center top;
  filter: drop-shadow(0px 3px 6px #00000028);
`;

const ItemProvider = styled.div`
  position: absolute;
  height: 40px;
  background-image: linear-gradient(0, #ffa200, white);
  padding: 10px 10px 0px;
  border-bottom-right-radius: 25px;
  width: auto;
  font-size: 14px;
  font-weight: bold;
`;
const GameDesc = styled.div`
  padding-left: 10px;

  height: 28px;
  float: right;
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  right: 0;
  top: 0;
  z-index: 3;
`;
const Namecontainer = styled.div`
  width: 195px;
  height: 25px;
  background: linear-gradient(0deg, black, transparent);
  color: #ffffff;
  font-size: 14px;
  padding: 3px 10px 0 10px;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: absolute;
  bottom: 0;
  text-align: left;
`;

const Bookmark = styled.div`
  float: right;

  width: 30px;
  height: 28px;
  background-repeat: no-repeat;
  background-position: 8px center;

  ${(props) =>
    props.bookmark
      ? ` background-image:  url(${SlotBookmark1PNG})`
      : `  background-image:  url(${SlotBookmark2PNG})`};
`;

const Spliter = styled.div`
  background-color: #515151;
  width: 1px;
  float: left;
  height: 14px;
  margin: 7px 0 10px 0;
`;

const GameProviderContainer = styled.div`
  display: flex;
  width: 1280px;
  height: 50px;
  border-radius: 10px;

  margin: 10px auto 30px auto;
  padding: 0 15px;
  box-sizing: border-box;
  overflow-y: auto;
  background: #252958;

  .slick-prev {
    left: 0;
    z-index: 1;
  }

  .slick-next {
    right: 0;
    z-index: 1;
  }
`;

const GameProviderContainerV2 = styled.div`
  display: flex;
  width: 1280px;
  height: 80px;
  border-radius: 10px;

  margin: 10px auto 30px auto;
  padding: 0 15px;
  box-sizing: border-box;
  overflow-y: auto;

  .slick-list {
    margin: 0 20px;
    overflow: hidden;
  }

  .slick-prev {
    left: 0;
    z-index: 1;
  }

  .slick-next {
    right: 0;
    z-index: 1;
  }
`;

const GameProvider = styled.div`
  float: left;
  font-size: 14px;
  color: ${(props) => (props.active ? "#ffa200" : "#ffffff")};
  padding-right: 5px;
  margin-top: 15px;
  text-align: center;

  &:hover {
    color: #ffa200;
  }
`;

const GameProviderImage = styled.div`
  background: url(${(props) =>
      process.env.PUBLIC_URL + `/assets/images/provider/` + props.img + `.png`})
    no-repeat;
  width: 45px;
  height: 45px;
  background-size: contain;
`;

const GameProviderV2 = styled.div`
  float: left;
  font-size: 14px;
  color: ${(props) => (props.active ? "#ffa200" : "#ffffff")};
  padding-right: 5px;
  text-align: center;
  border-radius: 10px;
  width: 100px;
  height: 80px;
  margin: 0 5px;
  background: ${({ theme }) => theme.containerBg2};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 13px;
  cursor: pointer;
  &:hover {
    color: #ffa200;
  }
`;
class Slots extends Component {
  constructor(props) {
    super(props);

    const type = this.getType();

    this.state = {
      favGame: [],
      firstLoad: true,
      filterGame: 0,
      keyword: "",
      gameList: [],
      page: 1,
      limit: 25,
      total: 0,
      type: type,
      platformList: [],
      loading: false,
      platform: this.props.match.params.platform
        ? this.props.match.params.platform
        : "",
    };
  }
  language = null;
  componentDidMount() {
    this.getGameList();
    if (this.props.token !== null && this.props.token !== "") {
      this.getFav();
    }
  }
  getFav(type = this.state.type) {
    var result = GameService.GetFavoriteGame(type);
    result.then((response) => {
      if (response.IsSuccess) {
        var data = response.data;
        this.setState({
          ...this.state,
          favGame: data,
        });
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.type !== this.state.type ||
      prevProps.match.params.platform !== this.props.match.params.platform ||
      prevProps.match.url !== this.props.match.url
    ) {
      if (prevProps.match.url !== this.props.match.url) {
        //window.scrollTo({ top: 0, behavior: "smooth" });
        var platform = this.props.match.params.platform
          ? this.props.match.params.platform
          : "";

        this.getGameList(1, platform, this.getType());
      } else if (prevState.type !== this.state.type) {
        if (this.props.token !== null && this.props.token !== "") {
          this.getFav();
        }
      } else if (
        prevProps.match.params.platform !== this.props.match.params.platform
      ) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        this.setState({
          ...this.state,
          platform: this.props.match.params.platform
            ? this.props.match.params.platform
            : "",
        });
      } else {
        this.getGameList();
      }
    }
    if (
      this.props.location.state !== undefined &&
      this.props.location.state !== null &&
      this.props.location.state.category !== undefined &&
      this.props.location.state.category !== null
    ) {
      this.props.history.replace(this.props.location.pathname, null);
      window.scrollTo({ top: 200, behavior: "smooth" });
      this.handleFilterGameClick(this.props.location.state.category);
    }
    if (prevProps.token !== this.props.token && this.props.token !== null) {
      this.getFav();
    }
  }
  getType() {
    const type =
      this.props.match.url.indexOf("electron") >= 0
        ? GameTypeEnum.TABLEGAME
        : this.props.match.url.indexOf("slots") >= 0
        ? GameTypeEnum.SLOT
        : this.props.match.url.indexOf("fish") >= 0
        ? GameTypeEnum.FISH
        : GameTypeEnum.TABLEGAME;
    return type;
  }
  getGameList(
    page = this.state.page,
    platform = this.state.platform,
    type = this.state.type
  ) {
    this.setState({
      ...this.state,

      loading: true,
    });

    var result = GameService.GetGameList(platform, type);
    result.then((response) => {
      if (response.IsSuccess) {
        var data = response.data;

        if (page === 1) {
          this.setState({
            ...this.state,
            page: page,
            platform: platform,
            type: type,
            gameList: data,
            loading: false,
          });
        } else {
          this.setState({
            ...this.state,
            page: page,
            platform: platform,
            type: type,
            gameList: this.state.gameList.concat(response.data),
            loading: false,
          });
        }
      } else {
        this.setState({
          ...this.state,
          gameList: [],
          platform: platform,
          type: type,
          loading: false,
        });
      }
    });
  }
  handleParentClick = (platform) => {
    const type =
      this.props.match.url.indexOf("fish") >= 0
        ? "fish"
        : this.props.match.url.indexOf("slots") >= 0
        ? "slots"
        : "electron";
    AppHistory.push(`/${type}/${platform}`);
  };
  handleFilterGameClick = (filterType) => {
    this.setState({ ...this.state, filterGame: filterType, page: 1 });
  };
  handleKeywordChange = (e) => {
    this.setState({ ...this.state, keyword: e.target.value });
  };
  // handleSearchClick = (e) => {
  //   this.getGameList(1);
  // };
  // handleMoreClick = () => {
  //   this.setState({ ...this.state, page: this.state.page + 1 });
  // };
  // handleBookmarkClick = (id, collect_id) => {
  //   if (this.props.token) {
  //     if (collect_id > 0) {
  //       GameService.DeleteBookmarkSlotGame(collect_id).then((response) => {
  //         if (response.IsSuccess) {
  //           this.setState((preState) => {
  //             let newList = [];
  //             for (let k in this.state.gameList) {
  //               var item = this.state.gameList[k];
  //               if (item.id === id) {
  //                 item.collect_id = 0;
  //                 if (this.state.filterGame !== SlotFilterType.Bookmark) {
  //                   newList.push(item);
  //                 }
  //               } else {
  //                 newList.push(item);
  //               }
  //             }
  //             return { ...preState, gameList: newList };
  //           });
  //         }
  //       });
  //     } else {
  //       GameService.BookmarkSlotGame(this.props.token, id).then((response) => {
  //         if (response.IsSuccess) {
  //           var collect_id = response.data;
  //           this.setState((preState) => {
  //             let newList = [];
  //             for (let k in this.state.gameList) {
  //               var item = this.state.gameList[k];
  //               if (item.id === id) {
  //                 item.collect_id = collect_id;
  //               }
  //               newList.push(item);
  //             }
  //             return { ...preState, gameList: newList };
  //           });
  //           // this.state.gameList.filter((row) => row.id === id);
  //         }
  //       });
  //     }
  //   }
  // };
  handleJoinGameClick = (gpcode, gpid) => {
    const type =
      this.props.match.url.indexOf("fish") >= 0
        ? "fish"
        : this.props.match.url.indexOf("slots") >= 0
        ? "slots"
        : "electron";
    if (this.props.token) {
      Common.closePreviousPopup();
      // this.props.performBalanceRefresh();
      this.props.history.push(`/${type}/play/${gpcode}/${gpid}`);
    } else {
      this.props.showLogin(true);
    }
  };

  genCategoryItem(category, text) {
    if (this.props.token == null && category === 3) {
      return null;
    }
    return (
      <CategoryContainer
        onClick={() => this.handleFilterGameClick(category)}
        active={this.state.filterGame === category}
      >
        <CategoryText>{text}</CategoryText>
      </CategoryContainer>
    );
  }

  handleToggleFavorite = (match, id, match2) => {
    if (this.props.token !== null && this.props.token !== "") {
      if (match) {
        this.props.removeFavoriteGame(id).then(() => {
          var array = [...this.state.favGame];
          var index = array.indexOf(id);
          if (index !== -1) {
            array.splice(index, 1);
            this.setState({ favGame: array });
          }
        });
      } else {
        this.props.setFavoriteGame(id).then(() => {
          this.setState({
            ...this.state,
            favGame: [...this.state.favGame, id],
          });
        });
      }
    }
  };
  render() {
    let list = null;
    if (this.state.gameList.length > 0) {
      list = this.state.gameList
        .filter((a) => {
          if (this.state.filterGame === SlotFilterType.All) return true;
          else {
            if (this.state.filterGame === SlotFilterType.Hot) {
              return a.tag.hot === true;
            } else if (this.state.filterGame === SlotFilterType.New) {
              return a.tag.new === true;
            } else if (this.state.filterGame === SlotFilterType.Recommend) {
              return a.tag.recommend === true;
            } else if (this.state.filterGame === SlotFilterType.Bookmark) {
              return this.state.favGame.indexOf(a.id) > -1;
            }
          }

          return false;
        })
        .filter((a) => {
          if (this.state.keyword === "") return true;
          else
            return a.name
              .toUpperCase()
              .includes(this.state.keyword.toUpperCase());
        })
        .filter((s) => {
          return s.isactive === true; // show only active game.
        })
        .map((el, i) => {
          var theName;
          this.props.game.providerList.filter((a) => {
            if (a.abbreviation === el.gpcode) {
              return (theName = a.name);
            }
            return theName;
          });
          return (
            <ItemContainer
              key={i}
              img={`${
                config.sourceUrl
              }${el.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${
                el.code
              }.jpg`}
            >
              {/* <ItemProvider>{el.gpcode}</ItemProvider> */}
              {el.tag.hot && <GameTagContainer>Hot</GameTagContainer>}
              {/* <GameDesc>
                <GameProvider>{theName}</GameProvider>
                <Spliter></Spliter>
                <Bookmark
                  bookmark={this.state.favGame.indexOf(el.id) > -1}
                  onClick={() =>
                    this.handleToggleFavorite(
                      this.state.favGame.indexOf(el.id) > -1,
                      el.id
                    )
                  }
                ></Bookmark>
              </GameDesc> */}
              <GameHoverSelection
                onClick={() => this.handleJoinGameClick(el.gpcode, el.id)}
              >
                <PlayButton>Play</PlayButton>
              </GameHoverSelection>
              <Namecontainer>{el.name}</Namecontainer>
            </ItemContainer>
          );
        });
    }

    const sliderSettings = {
      dots: false,
      className: "center",
      centerMode: false,
      infinite: false,
      variableWidth: true,
      adaptiveHeight: true,
      centerPadding: "0px",
      slidesToShow: 6,
      slidesToScroll: 2,
      initialSlide: 0,
      speed: 500,
      arrows: true,
      autoplay: false,
      lazyLoad: "progressive",
    };
    return (
      <Container type={this.state.type}>
        <JackpotContainer></JackpotContainer>
        <GameSubFilterContainer>
          {this.genCategoryItem(SlotFilterType.All, i18n.t("slot.allGame"))}
          {this.genCategoryItem(SlotFilterType.Hot, i18n.t("slot.hotGame"))}
          {this.genCategoryItem(SlotFilterType.New, i18n.t("slot.newGame"))}
          {this.genCategoryItem(
            SlotFilterType.Recommend,
            i18n.t("slot.recommendGame")
          )}
          {/* {this.genCategoryItem(
              SlotFilterType.Bookmark,
              i18n.t("slot.bookmarkGame")
            )} */}
          <SearchFilterItemContainer>
            <SearchOutlined></SearchOutlined>
            <SearchFilterItemInput
              type="text"
              maxLength="15"
              autocomplete="off"
              placeholder={i18n.t("T13.slot.search")}
              onChange={this.handleKeywordChange}
            ></SearchFilterItemInput>
          </SearchFilterItemContainer>
        </GameSubFilterContainer>
        {this.props.game.homePageGameList.length > 0 && (
          <GameProviderContainerV2>
            <Slick {...sliderSettings}>
              <div>
                <GameProviderV2
                  active={this.state.platform === ""}
                  onClick={() => this.handleParentClick("")}
                >
                  {i18n.t("slot.all")}
                </GameProviderV2>
              </div>
              {this.props.game.homePageGameList
                .filter((ele) => {
                  return ele.type === this.state.type; //check for only SLOT enum.
                })
                .map((row, index) => {
                  return (
                    <div>
                      <GameProviderV2
                        active={this.state.platform === row.abbreviation}
                        key={index}
                        onClick={() => this.handleParentClick(row.abbreviation)}
                      >
                        <GameProviderImage
                          img={row.abbreviation.toLowerCase()}
                        />
                        {row.abbreviation}
                      </GameProviderV2>
                    </div>
                  );
                })}
            </Slick>
          </GameProviderContainerV2>
        )}
        <InnerWrap type={this.state.type}>
          <GameListContainer>
            <Loading show={this.state.loading}></Loading>
            {list}
          </GameListContainer>
          {/* <ButtonMore
            onClick={this.handleMoreClick}
            style={{
              visibility:
                this.state.gameList.length < this.state.total
                  ? "visible"
                  : "hidden",
            }}
          >

          </ButtonMore> */}
        </InnerWrap>
      </Container>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
    setFavoriteGame: (gameId) => dispatch(gameAction.setFavoriteGame(gameId)),
    removeFavoriteGame: (gameId) =>
      dispatch(gameAction.removeFavoriteGame(gameId)),
  };
};
const mapStateToProps = (state) => {
  return {
    token: state.account.token,
    // jackpotAmount: state.ui.jackpotAmount,
    game: state.game,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Slots);
