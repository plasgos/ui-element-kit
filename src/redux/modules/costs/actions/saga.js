import { put } from "redux-saga/effects";
import * as actions from "../actions/actions";
import costs from "../../../../dummy/costs.json";

function* getCosts(values) {
  // const {payload} = values;
  yield put(actions.setIsLoadingGetCost(true));
  try {
    // const response = yield call(axios, payload)
    // const {data} = response;
    yield put(actions.getCostSuccess(costs));
  } catch (e) {
    yield put(actions.setIsLoadingGetCost(false));
  } finally {
    yield put(actions.setIsLoadingGetCost(false));
  }
}

export { getCosts };
