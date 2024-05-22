export type PlayerEventType = 'TrackStartEvent' | 'TrackEndEvent' | 'TrackExceptionEvent' | 'TrackStuckEvent' | 'WebSocketClosedEvent';
export type TrackEndReason = 'finished' | 'loadFailed' | 'stopped' | 'replaced' | 'cleanup';

/**
 * The event data
 * @typedef {TrackEndEvent | TrackStuckEvent | WebSocketClosedEvent | TrackStartEvent | TrackExceptionEvent} EventData
 */
export type EventData = TrackEndEvent | TrackStuckEvent | WebSocketClosedEvent | TrackStartEvent | TrackExceptionEvent;

/**
 * Represents an event related to a player.
 */
export interface PlayerEvent {
    op: 'event';
    type: PlayerEventType;
    guildId: string;
}

/**
 * Represents an event indicating the start of a track.
 */
export interface TrackStartEvent extends PlayerEvent {
    type: 'TrackStartEvent';
    track: any;
}

/**
 * Represents an event indicating the end of a track.
 */
export interface TrackEndEvent extends PlayerEvent {
  type: 'TrackEndEvent';
  track: any;
  reason: TrackEndReason;
}

/**
* Represents an event indicating that a track got stuck while playing.
*/
export interface TrackStuckEvent extends PlayerEvent {
  type: 'TrackStuckEvent';
  track: any;
  thresholdMs: number;
}

/**
* Represents an event indicating an exception occurred with a track.
*/
export interface TrackExceptionEvent extends PlayerEvent {
  type: 'TrackExceptionEvent';
  exception: any;
}

/**
* Represents an event indicating that a WebSocket connection was closed.
*/
export interface WebSocketClosedEvent extends PlayerEvent {
  type: 'WebSocketClosedEvent';
  code: number;
  byRemote: boolean;
  reason: string;
};