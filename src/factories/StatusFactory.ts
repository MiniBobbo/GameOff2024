import { StatusDead } from "../model/statuses/StatusDead";
import { StatusHaste } from "../model/statuses/StatusHaste";
import { StatusStrength } from "../model/statuses/StatusStrength";
import { StatusModel, StatusTypes } from "../model/StatusModel";

export class StatusFactory {
    static CreateStatus(type, value, ticks):StatusModel {
        switch(type) {
            case StatusTypes.Strength:
                return new StatusStrength(value, ticks);
            case StatusTypes.Haste:
                return new StatusHaste(value, ticks);
            case StatusTypes.Dead:
                return new StatusDead(0);
        }
    }
}