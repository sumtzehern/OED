/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { User } from '../types/items';
import { ActionType, Dispatch, GetState, Thunk } from '../types/redux/actions';
import * as t from '../types/redux/currentUser';
import { State } from '../types/redux/state';
import { usersApi, verificationApi } from '../utils/api';
import { deleteToken, hasToken } from '../utils/token';

/* eslint-disable */

export function requestCurrentUser(): t.RequestCurrentUser {
	return { type: ActionType.RequestCurrentUser };
}

export function receiveCurrentUser(data: User): t.ReceiveCurrentUser {
	return { type: ActionType.ReceiveCurrentUser, data };
}

/**
 * Check if we should fetch the current user's data. This function has the side effect of deleting an invalid token from local storage.
 * @param {State} state The redux state
 * @returns {boolean} Return true if we should fetch the current user's data. Returns false otherwise.
 */
async function shouldFetchCurrentUser(state: State): Promise<boolean> {
	// If we are currently fetching the current user, we should not fetch the data again.
	if (!state.currentUser.isFetching) {
		if (hasToken()) {
			// If we have a token, we should check to see if it is valid.
			if (await verificationApi.checkTokenValid()) {
				// If the token is valid, we should fetch the current user's data.
				return true;
			} else {
				deleteToken(); // We should delete the token when we know that it is invalid. This helps ensure that we do not keep an invalid token.
				return false;
			}
		} else {
			return false;
		}
	} else {
		return false;
	}
}

export function fetchCurrentUser(): Thunk {
	return async (dispatch: Dispatch) => {
		dispatch(requestCurrentUser());
		const user = await usersApi.getCurrentUser();
		return dispatch(receiveCurrentUser(user));
	};
}

export function fetchCurrentUserIfNeeded(): Thunk {
	return async (dispatch: Dispatch, getState: GetState) => {
		if (await shouldFetchCurrentUser(getState())) {
			return dispatch(fetchCurrentUser());
		}
		return Promise.resolve();
	};
}

export function clearCurrentUser(): t.ClearCurrentUser {
	return { type: ActionType.ClearCurrentUser };
}