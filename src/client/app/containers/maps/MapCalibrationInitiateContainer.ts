/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { connect } from 'react-redux';
import { updateMapMode, updateMapSource } from '../../actions/map';
import MapCalibrationInitiateComponent from '../../components/maps/MapCalibrationInitiateComponent';
import { Dispatch } from '../../types/redux/actions';
import { CalibrationModeTypes, MapMetadata } from '../../types/redux/map';
import { State } from '../../types/redux/state';

/* eslint-disable */

function mapStateToProps(state: State) {
	return {
		map: state.maps.editedMaps[state.maps.calibratingMap]
	}
}

function mapDispatchToProps(dispatch: Dispatch) {
	return {
		updateMapMode: (nextMode: CalibrationModeTypes) => dispatch(updateMapMode(nextMode)),
		onSourceChange: (data: MapMetadata) => dispatch(updateMapSource(data))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MapCalibrationInitiateComponent);
