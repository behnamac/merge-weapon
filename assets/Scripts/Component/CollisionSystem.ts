import { _decorator, BoxCollider, BoxCollider2D, Collider, Collider2D, Component, ICollisionEvent, ITriggerEvent } from 'cc';
import { eventManager } from '../Manager/EventManager';
import { GameManager } from '../Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('CollisionSystem')
export class CollisionSystem extends Component {

    start() {
        let collider = this.node.getComponent(Collider);
        collider.on('onTriggerEnter', this.onTriggerEnter, this);
        collider.on('onCollisionEnter', this.onCollisionEnter, this);
    }

    onTriggerEnter(event: ITriggerEvent)
    {
    }
    onCollisionEnter(event: ICollisionEvent)
    {

    }
}


