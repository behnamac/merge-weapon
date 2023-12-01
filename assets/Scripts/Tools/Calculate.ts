import { Component, PhysicsSystem, Vec3, _decorator } from "cc";

const { ccclass, property } = _decorator;

@ccclass
export default class Calculate extends Component {

    public static CalculateVelocity(target: Vec3, origin: Vec3, time: number): Vec3 {
        const distance: Vec3 = target.clone().subtract(origin);
        const distanceXZ: Vec3 = new Vec3(distance.x, 0, distance.z);

        const Sy: number = distance.y;
        const Sxz: number = distanceXZ.length();

        var gravity = 10
        const Vy: number = Sy / time + 0.5 * gravity * time;
        const Vxz: number = Sxz / time;

        const result: Vec3 = distanceXZ.normalize();
        result.multiplyScalar(Vxz);
        result.y = Vy;

        return result;
    }
}
