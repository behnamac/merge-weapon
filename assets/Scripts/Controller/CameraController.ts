import { _decorator, Component, EventMouse, game, Input, input, math, Node, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraController')
export class CameraController extends Component {
    @property(Number)
    speedRotate: number = 0

    @property(Vec2)
    minRotate: Vec2 = new Vec2()
    @property(Vec2)
    maxRotate: Vec2 = new Vec2()

    _targetRotate: Vec3 = new Vec3()

    onLoad() {
        this._targetRotate = new Vec3(this.node.eulerAngles)
    }
    start() {
        input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove,this)
    }

    onMouseMove(event: EventMouse)
    {
        var horizontal = event.getDeltaX()
        var vertical = event.getDeltaY()

        this._targetRotate.x += vertical * this.speedRotate * game.deltaTime
        this._targetRotate.y -= horizontal * this.speedRotate * game.deltaTime

        this._targetRotate.x = math.clamp(this._targetRotate.x, this.minRotate.x, this.maxRotate.x)
        this._targetRotate.y = math.clamp(this._targetRotate.y, this.minRotate.y, this.maxRotate.y)

        this.node.eulerAngles = this._targetRotate
    }
}


