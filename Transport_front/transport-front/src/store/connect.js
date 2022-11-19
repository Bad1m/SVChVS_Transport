import { connect } from "react-redux";
import * as repositoryActions from "../../../store/actions/repositoryActions";
import ClientList from "../containers/ClientList/ClientList";

const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onGetData: (url, props) => dispatch(repositoryActions.getData(url, props)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ClientList);
