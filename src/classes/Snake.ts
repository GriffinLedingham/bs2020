import Vector2 from "../util/Vector2";

class Snake {
  private id: string;
  private name: string;
  private health: number;
  private body: Array<Vector2>;

  constructor(payload: SnakePayload) {
    this.id = payload.id;
    this.name = payload.name;
    this.health = payload.health;
    this.body = [];
    for (let i = 0, bodyLength = payload.body.length; i < bodyLength; i++) {
      const bodySegment = payload.body[i];
      this.body.push(new Vector2(bodySegment.x, bodySegment.y));
    }
  }

  getId(): string {
    return this.id;
  }

  getHead(): Vector2 {
    return this.body[0];
  }

  getLength(): number {
    return this.body.length;
  }

  clone() {
    const cloneBody = [];
    for (let i = 0, bodyLength = this.body.length; i < bodyLength; i++) {
      cloneBody.push(this.body[i].clone());
    }
    const clone = new Snake({
      id: this.id,
      name: this.name,
      health: this.health,
      body: cloneBody
    });
  }
}

export default Snake;
