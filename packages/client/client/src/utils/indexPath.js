/* Copied and pasted from CollectionView */
export default class IndexPath {
    constructor(section, index) {
        this.section = section;
        this.index = index;
    }

    equals(other) {
        if (other === this) {
            return true;
        }

        if (!(other instanceof IndexPath)) {
            return false;
        }

        return other.section === this.section && other.index === this.index;
    }

    isGreaterThan(other) {
        return (
            this.section > other.section ||
            (this.section === other.section && this.index > other.index)
        );
    }

    isLessThan(other) {
        return (
            this.section < other.section ||
            (this.section === other.section && this.index < other.index)
        );
    }

    min(other) {
        if (this.isLessThan(other)) {
            return this;
        }

        return other;
    }

    max(other) {
        if (this.isGreaterThan(other)) {
            return this;
        }

        return other;
    }

    copy() {
        return new IndexPath(this.section, this.index);
    }
}
/* End copy and paste section */
