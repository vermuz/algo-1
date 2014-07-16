package quicksort

import "math/rand"

func Sort(a []int) {
	// fmt.Printf("Sort: %v\n", a)

	if len(a) < 2 {
		return
	}

	p := partition(a)
	Sort(a[:p])
	Sort(a[p+1:])
}

func partition(a []int) int {
	p := medianPivot(a)
	// fmt.Printf("partition: %v with pivot %d\n", a, p)

	last := len(a) - 1
	swap(a, p, last)

	firstHigh := 0
	for i := 0; i < last; i++ {
		v := a[i]
		if v < a[last] {
			swap(a, i, firstHigh)
			firstHigh++
		}
	}
	swap(a, last, firstHigh)

	return firstHigh
}

func swap(a []int, i, j int) {
	// fmt.Printf("swap: %v indexes %d and %d\n", a, i, j)

	t := a[i]
	a[i] = a[j]
	a[j] = t
}

func randomPivot(a []int) int {
	return rand.Intn(len(a))
}

func medianPivot(a []int) int {
	mid := len(a) / 2
	end := len(a) - 1

	switch {
	case between(a[0], a[mid], a[end]):
		return 0
	case between(a[mid], a[0], a[end]):
		return mid
	default:
		return end
	}
}

func between(a, x, y int) bool {
	return x <= a && a <= y || y <= a && a <= x
}