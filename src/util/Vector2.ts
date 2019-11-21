class Vector2 {
  private x: number;
  private y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  set(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  equals(vector: Vector2) {
    return this.x == vector.x && this.y == vector.y;
  }
  clone() {
    return new Vector2(this.x, this.y);
  }
}

export default Vector2;
