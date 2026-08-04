"""Async RL timeline: decoding resumes on the existing KV cache, so a single
rollout's tokens can come from more than one weight version."""
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

W_OLD = "#a7cee3"   # decode under weights w_k
W_NEW = "#5b9bc4"   # decode under weights w_{k+1}
LOAD = "#e2888c"    # load weights
ACCENT = "#6a1b9a"  # callouts
INK = "#2b2b2b"

PAUSE, RESUME, END = 42, 53, 96
BAR_H = 0.52

# (engine row, label, x0, x1, weight version)
SEGS = [
    (0, "s1", 0, 18, 0), (0, "s5", 18, PAUSE, 0),
    (0, "s5", RESUME, 76, 1), (0, "s10", 76, END, 1),
    (1, "s2", 0, 12, 0), (1, "s4", 12, 26, 0), (1, "s7", 26, PAUSE, 0),
    (1, "s7", RESUME, 70, 1), (1, "s8", 70, 83, 1), (1, "s11", 83, END, 1),
    (2, "s3", 0, 22, 0), (2, "s6", 22, PAUSE, 0),
    (2, "s6", RESUME, 78, 1), (2, "s9", 78, END, 1),
]
SPANNING = {(0, "s5"), (1, "s7"), (2, "s6")}  # sequences that straddle the swap

fig, ax = plt.subplots(figsize=(10.2, 4.9), dpi=110)
ax.set_xlim(-13, 105)
ax.set_ylim(-2.9, 3.5)
ax.axis("off")

for row, label, x0, x1, ver in SEGS:
    y = 2 - row
    spans = (row, label) in SPANNING
    ax.add_patch(FancyBboxPatch(
        (x0, y - BAR_H / 2), x1 - x0, BAR_H,
        boxstyle="round,pad=0,rounding_size=0.6",
        facecolor=W_NEW if ver else W_OLD,
        edgecolor=ACCENT if spans else "#4a4a4a",
        linewidth=1.8 if spans else 0.8, zorder=3))
    ax.text((x0 + x1) / 2, y, label, ha="center", va="center",
            fontsize=10.5, color="#1c1c1c", zorder=4)

# weight-load block spanning all three engines
ax.add_patch(FancyBboxPatch(
    (PAUSE, 0 - BAR_H / 2), RESUME - PAUSE, 2 + BAR_H,
    boxstyle="round,pad=0,rounding_size=0.6",
    facecolor=LOAD, edgecolor="#8c4548", linewidth=0.9, zorder=3))

for row in range(3):
    ax.text(-2, 2 - row, f"Engine {row + 1}", ha="right", va="center",
            fontsize=11, color=INK)

for x, name, ha, dx in ((PAUSE, "pause", "right", -1), (RESUME, "resume", "left", 1)):
    ax.plot([x, x], [-1.05, 2.75], color="#1c1c1c", lw=1.6, zorder=2)
    ax.text(x + dx, -1.28, name, ha=ha, va="top", fontsize=10, color=INK)

# A training step starts once its batch of rollouts has finished (blue line) and
# runs until the engines pause to take the new weights.
for start, stop in ((26, PAUSE), (83, 99)):
    ax.plot([start, start], [-1.05, 2.75], color="#2c5f8a", lw=1.6, zorder=2)
    ax.add_patch(FancyBboxPatch((start, -0.95), stop - start, 0.6,
                                boxstyle="round,pad=0,rounding_size=0.25",
                                facecolor="#f2c9a8", edgecolor="#b3814f", zorder=3))
    ax.text((start + stop) / 2, -0.65, "train", ha="center", va="center",
            fontsize=10.5, color=INK)

# the point of the figure
ax.add_patch(FancyArrowPatch((63, 3.15), (RESUME + 5, 2.42),
                             arrowstyle="-|>", mutation_scale=14,
                             color=ACCENT, lw=1.7, zorder=5))
ax.text(64, 3.2, "same sequence, two weight versions", fontsize=10.5,
        color=ACCENT, va="center", fontweight="bold")
ax.text((PAUSE + RESUME) / 2, -2.05, "KV cache kept — decode just continues",
        fontsize=10.5, color=ACCENT, style="italic", ha="center")

handles = [
    plt.Rectangle((0, 0), 1, 1, facecolor=W_OLD, edgecolor="#4a4a4a", lw=0.8),
    plt.Rectangle((0, 0), 1, 1, facecolor=W_NEW, edgecolor="#4a4a4a", lw=0.8),
    plt.Rectangle((0, 0), 1, 1, facecolor=LOAD, edgecolor="#8c4548", lw=0.8),
]
ax.legend(handles, ["decode under $w_k$", "decode under $w_{k+1}$", "load weights"],
          loc="lower right", bbox_to_anchor=(1.0, -0.02), frameon=False,
          fontsize=10.5, ncol=3, handlelength=1.4, columnspacing=1.4)

fig.tight_layout()
fig.savefig("docs/asset/ti-mismatch-async-timeline.png", facecolor="white",
            bbox_inches="tight", pad_inches=0.18)
print("ok")
