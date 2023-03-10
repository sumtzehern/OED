/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { ActionType } from '../types/redux/actions';
import { NotificationAction, NotificationsState } from '../types/redux/notifications';

const defaultState: NotificationsState = {
	notification: {}
};

/* eslint-disable */

export default function topLevel(state = defaultState, action: NotificationAction) {
	switch (action.type) {
		case ActionType.ShowNotification:
			return {
				...state,
				notification: action.notification
			};
		case ActionType.ClearNotifications:
			return {
				...state,
				notification: {}
			};
		default:
			return state;
	}
}
