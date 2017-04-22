import {
  LOAD_METRICS,
  LOAD_METRICS_SUCCESS,
  LOAD_PATH,
  LOAD_PATH_SUCCESS,
  LOAD_GATEWAY,
  LOAD_GATEWAY_SUCCESS
} from './metricsConstants';


const initialState = {
  metrics: [],
  error:null,
  loading: false,
  status: ''
};

export const reducer = (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case LOAD_METRICS:
      return Object.assign({}, initialState, {loading:true, status:'metrics_status_gateway'});
    case LOAD_GATEWAY_SUCCESS:
      return Object.assign({}, state, {gateway:payload.gateway, status:'metrics_status_path'});
    case LOAD_PATH_SUCCESS:
      let metrics = payload.map(x => ({hostname:x, loading:true, error:false}));
      return Object.assign({}, state, {metrics,loading:true, status:'metrics_status_stations'});
    case LOAD_METRICS_SUCCESS:
      let newMetrics = state.metrics.map(x => {
        if (x.hostname !== payload.hostname) { return x; }
        x.loading = false;
        return Object.assign({}, x, payload);
      });
      let loadingStatus = newMetrics.filter(x => x.loading === true).length !== 0;
      return Object.assign({}, state, { metrics: newMetrics, loading: loadingStatus });
    default:
      return state;
  }
};