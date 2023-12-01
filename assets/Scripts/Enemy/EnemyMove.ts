import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyMove')
export class EnemyMove extends Component {

    @property(Number)
    speed: number = 0
    start() {

    }

    update(deltaTime: number) {
        var axisMove = new Vec3(0, 0, -this.speed * deltaTime)
        this.node.translate(axisMove)
    }
}


